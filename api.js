const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'parking';

app.use(express.json())

app.get('/parkings', async (req,res) => {
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('place');
	const findResult = await collection.find({}).toArray();
    res.status(200).json(findResult);
})

app.get('/parkings/:id', async (req,res) => {
	const id = parseInt(req.params.id)
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('place');
	const findResult = await collection.find({id:id}).toArray();
    res.status(200).json(findResult);
})

app.post('/parkings', async (req,res) => {
	let retour = {insertion:false};
	const place = req.body;
	if (checkPlace(place)) {
		await client.connect();
		const db = client.db(dbName);
		const collection = db.collection('place');
		const id = await lastId();
		const rendu = {...{id:id+1},...place}
		const insertResult = await collection.insertOne(rendu);
		retour = {...{insertion:insertResult.acknowledged},...rendu}
	}
	res.status(200).json(retour)
})

async function lastId() {
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('place');
	const findResult = await collection.find().sort({id: -1}).limit(1).toArray();
	return(findResult[0].id);
}

function checkPlace(place) {
	let res = false;
	if (Object.keys(place).length === 3) {
		if (!(place.name === undefined || place.type === undefined || place.city=== undefined)) {
			res = true;
		}
	} 
	return res;
}

app.listen(80, () => {
	    console.log("Rest API using express up")
})