# NodePop
Website and API application.

## Install
Install dependencies
```sh
$ npm install 
```

Review database connection on  /lib/connectMongoose.js 

Load initial data: 
```sh   
#This command deletes all the data in the database and create default database
npm run init-db
```

## Start
In production 
```sh
npm start
```



In development;
```sh
npm run dev
```


## API Endpoints
Available endpoints
- GET /api/api/products: Get all products.
- GET /api/products/:id: Get a product by ID.
- POST /api/products: Create a new product.
- PUT /api/products/:id: Update an existing product.
- DELETE /api/products/:id: Delete a product.

