const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const app = express()
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)
const port = process.env.PORT || 5000


// middlewares
app.use(cors())
app.use(express.json())





// mongodb connection starts here
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
console.log(user, password)

const uri = `mongodb+srv://${user}:${password}@cluster0.75ieoxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });


        const usersCollection = client.db('ClassMate').collection('users')
        const sessionsCollection = client.db('ClassMate').collection('sessions')
        const materialsCollection = client.db('ClassMate').collection('materials')
        const bookedSessionCollection = client.db('ClassMate').collection('bookedSessions')
        const reviewsCollection = client.db('ClassMate').collection('reviews')
        const notesCollection = client.db('ClassMate').collection('notes')


        // saving usersinfo in database
        app.post('/users', async (req, res) => {
            const userData = req.body;
            // console.log(userData)
            const result = await usersCollection.insertOne(userData)
            res.send(result)
        })

        // getting all users
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result)
        })

        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id
            const newRoleObject = req.body
            const newRole = newRoleObject.role
            // console.log(newRole, newRoleObject)
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    role: newRole
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // getting user role
        app.get('/users/:email/role', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const options = {
                projection: { role: 1 },
            }
            const role = await usersCollection.findOne(query, options)
            res.send(role)
        })


        // sessions collection api's
        app.post('/sessions', async (req, res) => {
            const sessionData = req.body;
            // console.log(sessionData)
            const result = await sessionsCollection.insertOne(sessionData)
            res.send(result)
        })

        app.get('/sessions', async (req, res) => {
            const result = await sessionsCollection.find().toArray()
            res.send(result)
        })

        app.get('/sessions/approved', async (req, res) => {
            const query = { status: "approved" }
            const result = await sessionsCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/sessions/:id', async (req, res) => {
            const id = req.params.id
            console.log('id query', id)
            const query = { _id: new ObjectId(id) }
            const result = await sessionsCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/sessions/emailQuery/:email', async (req, res) => {
            const email = req.params.email
            console.log('email query', email)
            const query = { tutorEmail: email }
            const result = await sessionsCollection.find(query).toArray()
            res.send(result)
        })



        app.patch('/sessions/:id', async (req, res) => {
            const id = req.params.id
            const info = req.body
            const newStatus = info.newStatus
            const newRegFee = info.amount || info.defaultAmount
            console.log(newStatus, newRegFee)
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    status: newStatus,
                    registrationFee: newRegFee,
                }
            }
            console.log(updateDoc)
            const result = await sessionsCollection.updateOne(filter, updateDoc)
            res.send(result)
        })


        app.patch('/sessions/request/:id', async (req, res) => {
            const id = req.params.id
            const info = req.body
            const newStatus = info.newStatus
            console.log(info, newStatus)
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    status: newStatus,
                }
            }
            const result = await sessionsCollection.updateOne(filter, updateDoc)
            res.send(result)
        })


        app.delete('/sessions/:id', async (req, res) => {
            const id = req.params.id
            console.log('delete id', id)
            const query = { _id: new ObjectId(id) }
            const result = await sessionsCollection.deleteOne(query)
            res.send(result)
        })


        // materials api
        app.post('/materials', async (req, res) => {
            const materialsData = req.body
            console.log(materialsData)
            const result = await materialsCollection.insertOne(materialsData)
            res.send(result)
        })

        app.get('/materials/:email', async (req, res) => {
            const email = req.params.email
            console.log(email)
            const query = { tutorEmail: email }
            const result = await materialsCollection.find(query).toArray()
            res.send(result)
        })


        // booked Session api's
        app.post('/bookedSessions', async (req, res) => {
            const bookedSessionData = req.body
            // console.log(bookedSessionData)
            const result = await bookedSessionCollection.insertOne(bookedSessionData)
            res.send(result)
        })

        app.get('/bookedSessions/:email', async (req, res) => {
            const email = req.params.email
            const query = { studentEmail: email }
            const result = await bookedSessionCollection.find(query).toArray()
            res.send(result)
        })


        app.get('/bookedSessions/status/:email', async (req, res) => {
            const email = req.params.email
            const query = { studentEmail: email }
            const options = {
                projection: { sessionId: 1 },
            }
            const result = await bookedSessionCollection.find(query, options).toArray()
            res.send(result)
        })


        // reviews api
        app.post('/reviews', async (req, res) => {
            const review = req.body
            const result = await reviewsCollection.insertOne(review)
            res.send(result)
        })


        // notes api
        app.post('/notes', async (req, res) => {
            const data = req.body
            console.log(data)
            const result = await notesCollection.insertOne(data)
            res.send(result)
        })

        app.get('/notes/:email', async (req, res) => {
            const email = req.params.email
            const query = { studentEmail: email }
            const result = await notesCollection.find(query).toArray()
            res.send(result)
        })

        app.patch('/notes/:email', async (req, res) => {
            const email = req.params.email
            const query = { studentEmail: email }
            const data = req.body
            console.log(data)

            const updateDoc = {
                $set: {
                    noteTitle: data?.title,
                    noteDescription: data?.description
                },
            };

            const result = await notesCollection.updateOne(query, updateDoc)
            res.send(result)
        })

        app.delete('/notes/:email', async(req, res)=> {
            const email = req.params.email
            const query = { studentEmail: email }
            const result = await notesCollection.deleteOne(query)
            res.send(result)
        })

        // stripe api
        app.post("/create-payment-intent", async (req, res) => {
            const sessionData = req.body;
            // console.log(items)
            const price = parseInt(sessionData.registrationFee) * 100

            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: price,
                currency: "usd",
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            // console.log(items)
            res.send({
                clientSecret: paymentIntent.client_secret,
                // success: items
            });
        })

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('classmate is running')
})

app.listen(port, () => {
    console.log(`ClassMate web server is listening on port ${port}`)
})