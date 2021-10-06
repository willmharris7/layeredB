"use strict";
// import bodyParser from 'body-parser';
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.get('/', (req: Request, res: Response) => {
//   res.send('<h1>Hello from the TypeScript world!</h1>');
// });
// app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const express = require('express')
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var dotenv_1 = __importDefault(require("dotenv"));
var MongoClient = require('mongodb').MongoClient;
var app = (0, express_1.default)();
dotenv_1.default.config();
var PORT = process.env.PORT || 8080;
var uri = "mongodb+srv://first_test_user:im7p9hcVdHo5aS@cluster0.1m63c.mongodb.net/test?retryWrites=true&w=majority";
var client = new MongoClient(uri);
app.use((0, helmet_1.default)());
app.use(express_1.default.json()); // replaces bodyParser.json()
app.use(express_1.default.urlencoded({ extended: true })); // for Postman: use x-www-form-urlencoded to post 
app.listen(PORT);
// Test endpoints //
app.get('/api/hello', function (req, res) {
    res.send({ express: 'Hello From Express' });
});
app.post('/api/world', function (req, res) {
    res.send("I received your POST request. This is what you sent me: " + Object.values(req.body)[0]);
});
// Test endpoints //
// app.get('/api/dbs', async function (req: Request, res: Response) {
//   await client.connect()
//   dbList = await client.db().admin().listDatabases()
//   dbNames = []
//   dbList.databases.forEach(db => dbNames.push(db.name))
//   await client.close()
//   res.send({ express: dbNames })
// })
// app.get('/api/top5', async function (req: Request, res: Response) {
//   await client.connect()
//   const dbResp = client.db('sample_airbnb').collection('listingsAndReviews').find().limit(5)
//   top5Listings = await dbResp.toArray()
//   top5ListingsNamesBedrooms = []
//   for (const listing of top5Listings) {
//     top5ListingsNamesBedrooms.push(listing.name + " has " + listing.bedrooms + " bedrooms")
//   }
//   await client.close()
//   res.send({ express: top5ListingsNamesBedrooms })
// })
// app.post('/api/bedrooms', async function (req: Request, res: Response) {
//   const number = parseInt(Object.values(req.body)[0])
//   await client.connect()
//   const dbResp = client.db('sample_airbnb').collection('listingsAndReviews').find({"bedrooms": number}).limit(5)
//   top5Listings = await dbResp.toArray()
//   top5ListingsNamesBedrooms = []
//   for (const listing of top5Listings) {
//     top5ListingsNamesBedrooms.push(listing.name + " has " + listing.bedrooms + " bedrooms")
//   }
//   await client.close()
//   res.send({ express: top5ListingsNamesBedrooms })
// })
