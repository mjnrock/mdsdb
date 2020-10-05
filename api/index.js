import express from "express";

const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://mdsdb:mdsdb@mdsdb-1.uwpiu.mongodb.net/?retryWrites=true&w=majority";
let mongodb;
MongoClient.connect(uri, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => mongodb = db);

const APP = express();
const PORT = 3001;
const DATABASE = "sandbox";

/**
 * This is a newer way to do the work commonly seen with `bodyParser`
 */
APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(express.raw());

/**
 * This activates CORS
 */
APP.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //? Whatever middleware work .next() is doing is ESSENTIAL to actually making this work
    next();
});

APP.get("/survey/:surveyId", (req, res) => {
    try {
        const sid = req.params.surveyId;
        mongodb.connect(err => {
            const db = mongodb.db(DATABASE);
            
            db.collection("surveys").findOne({
                id: sid,
            }).then(data => res.send(JSON.stringify(data))).catch()
        });
    } catch(e) {
        res.sendStatus(400);
    }
});

APP.post("/survey/upsert", (req, res) => {
    try {
        const obj = req.body;

        mongodb.connect(err => {
            const db = mongodb.db(DATABASE);
            const items = db.collection("surveys").updateOne({
                id: obj.id,
            }, {
                $set: obj,
            }, {
                upsert: true,
            });
        });
    } catch(e) {
        res.sendStatus(400);
    }
});

APP.get("/form/:formId", (req, res) => {
    try {
        const sid = req.params.formId;
        
        mongodb.connect(err => {
            const db = mongodb.db(DATABASE);
            
            db.collection("forms").findOne({
                id: sid,
            }).then(data => res.send(JSON.stringify(data))).catch()
        });
    } catch(e) {
        res.sendStatus(400);
    }
});

APP.post("/form/upsert", (req, res) => {
    try {
        const obj = req.body;

        mongodb.connect(err => {
            const db = mongodb.db(DATABASE);
            
            db.collection("forms").updateOne({
                id: obj.id,
            }, {
                $set: obj,
            }, {
                upsert: true,
            });
        });
    } catch(e) {
        res.sendStatus(400);
    }
});

/**
 * This causes the `express` library to invoke a server on port=@PORT, with a console.log callback
 */
APP.listen(PORT, () =>
    console.log(`DMT app listening on port ${ PORT }!`),
);