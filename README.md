This project is functional with a mongodb database installed on your device 
you just need to install it with the classic configuration and the API should work
Dont forget to change the database URL if its needed 

There is a sample file of data for the mongodb database
You just need to add them for testing the GET request but you
can fill the data base with POST request

exemple request :

GET/

your_domain/parkings   : get all the data of the base

your_domain/parkings/8  : the data with the id 8

POST/

your_domain/parkings

body : 
{
        "name":"Residence boufflers",
        "type": "RESIDENCE",
        "city": "NANCY"
}

you must have 3 fields with name,type and city otherwise the API will return
a "insertion:false" as result