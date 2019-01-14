# Project #3. RESTful Web API with Node.js Framework

This is Project 3. RESTful Web API for simple private blockchain powered by Express.js.

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node app.js__ in the root directory.

The project’s API service is configured to run on port 8000. The full URL is http://localhost:8000.

The response for endpoints provides in JSON format.

## Endpoints

### GET Block Endpoint
Return Block by their height

Endpoint: 

```/api/block/:height```

Example: 

* URL:

```http://localhost:8000/api/block/0```

* Response: 

```
{
   "hash":"49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3",
   "height":0,
   "body":"First block in the chain - Genesis block",
   "time":"1530311457",
   "previousBlockHash":""
}
```

* cURL example:

```curl -X GET http://localhost:8000/api/block/0 ```


### POST Block Endpoint
Add new block

Endpoint: 

```/api/block/```

Example: 

* URL:

```http://localhost:8000/api/block```

* Request body:
``` 
{
    "body": "Body of the block"
}
```

`body` - required string field. Min length is 1 symbol;


* Response: 

```
{
    "hash": "5efe5274ac8da9dc8d76170a22fa43f9040a5e5fcfa84807f4569773346745ee",
    "height": 4,
    "body": "Body of the block",
    "time": 1547422237,
    "previousBlockHash": "1a44f3c3462819fc6f2530c59a7b06c4e258c0da9b6a704be72d4f63df419754"
}
```

* cURL example:

```
curl -X POST \
  http://localhost:8000/api/block/ \
  -H 'Content-Type: application/json' \
  -d '{
"body": "Body of the block"
}' 
```

### Error response

* Format: 
```
{
    "message": "Error message text"
}
```

* Example: 
```
{
     "message": "Block not exist"
}
```
