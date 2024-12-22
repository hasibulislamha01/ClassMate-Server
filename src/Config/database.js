
// mongodb connection starts here
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()  //required to get .env variable's value
const user = hasibulStart
const password = hasibulSuchi
// console.log("user and password", user, password)

// getting mongdb uri
const uri = `mongodb+srv://${user}:${password}@cluster0.75ieoxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


//---------------- ( getting collections ... ) ---------------------
const usersCollection = client.db('ClassMate').collection('users')
const sessionsCollection = client.db('ClassMate').collection('sessions')
const materialsCollection = client.db('ClassMate').collection('materials')
const bookedSessionCollection = client.db('ClassMate').collection('bookedSessions')
const reviewsCollection = client.db('ClassMate').collection('reviews')
const notesCollection = client.db('ClassMate').collection('notes')
// console.log('users collection in databse folder', usersCollection);


// the following function connects the server to database
// the function is declared but so far not called
async function connectToDatabase() {
    try {
        await client.connect()
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
    return client;
}

module.exports = {
    connectToDatabase,
    usersCollection,
    sessionsCollection,
    materialsCollection,
    bookedSessionCollection,
    reviewsCollection,
    notesCollection
};


// the function is exported and ready to import from anywhere inside the project
// after we import the function we will call the function in the file where we imported
// only then the connection with the database will be established


/**
 * this file does the following job
    1. getting the  setup for mongodb
    2. creates a function to connect to database and exports it
    3. creates collections
    4. exports collections to connect to the database 
 */