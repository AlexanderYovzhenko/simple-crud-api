# simple-crud-api

Installation:  
1 Clone simple-crud-api: `git clone https://github.com/GoldenManBel/simple-crud-api.git`  
2 Branch development: `git checkout  development`  
3 Install dependencies: `npm i`  

Running app:  
1 Running the application in development mode: `npm run start:dev`  
2 Running the application in production mode: `npm run start:prod`  

You can check the operation of the application using "postman": `https://web.postman.co`.  
The server is running on the port specified in the ".env" file (localhost:3000).  

Working with the app:  
1 GET /person: The server returns status code 200 and all records  
2 GET /person/{personId}: The server returns status code 200 and an entry with id === personId, if there is such an entry  
3 POST /person: The server returns status code 201 and the newly created record  
4 PUT /person/{personId}: Server returns status code 200 and updated record  
5 DELETE /person/{personId}: The server returns the status code 204 if the record is found and deleted  


Errors that occur when processing a request for `/person` can be checked by inserting into the code `throw new Error('error')  

Testing the app:  
1 Run the application in the first terminal: `npm run start:dev` or `npm run start:prod`  
2 Run testing the application in the second terminal: `npm run test`  