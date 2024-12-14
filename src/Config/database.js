
// mongodb connection starts here
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()  //required to get .env variable's value
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
console.log("user and password", user, password)

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


// this function connects the server to database
// the function is declared bet never called
async function connectToDatabase() {
try {
        console.log('connected to mongodb');
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
    return client;
}

module.exports = connectToDatabase;
// the function is exported and ready to import from anywhere inside the project
// after we import the function we will call the function in the file where we imported
// only then the connection with the database will be established