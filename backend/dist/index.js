"use strict";
// import bodyParser from 'body-parser';
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
// req is required even for simple get paths, because express interprests the first param as Request
app.get('/api/hello', function (req, res) {
    res.send({ express: 'Hello From Express' });
});
app.post('/api/world', function (req, res) {
    res.send("I received your POST request. This is what you sent me: " + Object.values(req.body)[0]);
});
// Test endpoints //
app.get('/api/dbs', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var dbList, dbNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    console.log("in app");
                    return [4 /*yield*/, client.db().admin().listDatabases()];
                case 2:
                    dbList = _a.sent();
                    dbNames = [];
                    dbList.databases.forEach(function (db) { return dbNames.push(db.name); });
                    return [4 /*yield*/, client.close()];
                case 3:
                    _a.sent();
                    res.send({ express: dbNames });
                    return [2 /*return*/];
            }
        });
    });
});
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
