# NodePop

Website and API application.

## Install
Install dependencies
```sh
$ npm install 
```

Review database connection on  /lib/connectMongoose.js 


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


### GET /api/agentes
```json
{
    "result": {
        "name": "Pedrito",
        "age": 55,
        "_id": "651fb6ce85ea8baad9e52035",
        "__v": 0
    }
}
```