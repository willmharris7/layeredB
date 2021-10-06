// const express = require('express')
import express, { Express, Request, Response } from 'express'
import helmet from 'helmet';
import dotenv from 'dotenv';
const {MongoClient} = require('mongodb')
const app: Express = express()
dotenv.config()
const PORT = process.env.PORT || 8080
const uri = "mongodb+srv://first_test_user:im7p9hcVdHo5aS@cluster0.1m63c.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri)
app.use(helmet());
app.use(express.json()) // replaces bodyParser.json()
app.use(express.urlencoded({extended: true})) // for Postman: use x-www-form-urlencoded to post 
app.listen(PORT)

// Test endpoints //
// req is required even for simple get paths, because express interprests the first param as Request
app.get('/api/hello', (req: Request, res: Response) => {
  res.send({ express: 'Hello From Express' })
})

app.post('/api/world', (req: Request, res: Response) => {
  res.send(`I received your POST request. This is what you sent me: ${Object.values(req.body)[0]}`)
})
// Test endpoints //

app.get('/api/dbs', async function (req: Request, res: Response) {
  await client.connect()
  console.log("in app")
  const dbList : any = await client.db().admin().listDatabases()
  let dbNames : Array<String> = []
  dbList.databases.forEach((db : any) => dbNames.push(db.name))
  await client.close()
  res.send({ express: dbNames })
})

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