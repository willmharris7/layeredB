import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
const {MongoClient} = require('mongodb')
const app: Express = express()
const PORT = process.env.PORT || 8080
const uri = "mongodb+srv://first_test_user:im7p9hcVdHo5aS@cluster0.1m63c.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri)
app.use(helmet()); // Adds security headers 
app.use(express.json()) // replaces bodyParser.json()
app.use(express.urlencoded({extended: true})) // for Postman: use x-www-form-urlencoded to post 
app.listen(PORT)

// Test endpoints //
// req is required even for simple get paths, because express interprets the first param as Request
app.get('/api/hello', (req: Request, res: Response) => {
  res.send({ express: 'Hello From Express' })
})

app.post('/api/world', (req: Request, res: Response) => {
  res.send(`I received your POST request. This is what you sent me: ${Object.values(req.body)[0]}`)
})
// Test endpoints //

app.get('/api/dbs', async function (req: Request, res: Response) {
  await client.connect()
  const dbList: any = await client.db().admin().listDatabases()
  let dbNames: string[] = []
  dbList.databases.forEach((db: any) => dbNames.push(db.name))
  await client.close()
  res.send({ express: dbNames })
})

app.get('/api/top5', async function (req: Request, res: Response) {
  await client.connect()
  const top5Listings: any[] = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .find()
    .limit(5)
    .toArray()
  let top5ListingsNamesBedrooms: string[] = []
  for (const listing of top5Listings) {
    top5ListingsNamesBedrooms.push(listing.name + " has " + listing.bedrooms + " bedrooms")
  }
  await client.close()
  res.send({ express: top5ListingsNamesBedrooms })
})

app.post('/api/bedrooms', async function (req: Request, res: Response) {
  const n: number = parseInt(req.body["test_key"])
  await client.connect()
  const top5Listings: any[] = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .find({"bedrooms": n})
    .limit(5)
    .toArray()
  let top5ListingsNamesBedrooms: string[] = []
  for (const listing of top5Listings) {
    top5ListingsNamesBedrooms.push(listing.name + " has " + listing.bedrooms + " bedrooms")
  }
  await client.close()
  res.send({ express: top5ListingsNamesBedrooms })
})