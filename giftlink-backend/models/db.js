// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;
//console.log(url)
let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      
try{
    // Connect to MongoDB
     await client.connect()
     console.log("Successfully connected to MongoDB!")

    //  Connect to database giftDB and store in variable dbInstance
       dbInstance = client.db(dbName)

    //Return database instance
        return dbInstance
}catch(err){
    console.Error("Fail to connect the server",err)
}
}


module.exports = connectToDatabase;
