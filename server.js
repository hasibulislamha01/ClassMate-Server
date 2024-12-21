//-------------------------------------------------------------
/* ------------- this is the main server component ---------- */
//-------------------------------------------------------------


const express = require('express');
require('dotenv').config()
const cors = require('cors')
const { connectToDatabase } = require('./src/Config/database'); //importing connection function


const usersRouter = require('./src/routes/usersRoutes');  //importing user routes 
const sessionsRouter = require('./src/routes/sessionRoutes');
const materialRouter = require('./src/routes/materials');
const bookedSessionRoutes = require('./src/routes/bookedSessions')
const reviewRoutes = require('./src/routes/reviews')
const noteRoutes = require("./src/routes/notes")
const stripeRoute = require('./src/routes/stripe')
// ... other routes

const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://classmate-ac788.web.app",
        "https://classmate-ac788.firebaseapp.com",
    ]
}))
const port = process.env.PORT || 5000
// app.use(corsOptions)
app.use(express.json());


/**
 * express(): This line creates an instance of the Express application. Express is a   Node.js framework that simplifies the process of building web applications and APIs.

    app: This variable holds a reference to the newly created Express application. It will be used to define routes, middleware, and other configurations for the server.

    process.env.PORT: This checks for an environment variable named PORT. This is a common practice in web applications, especially when deploying to platforms like Heroku or AWS, where the platform assigns a dynamic port number.

    || 5000: If the PORT environment variable is not defined or is empty, the port variable is assigned the value 5000. This is a default port number often used for development and testing purposes.

    app.use(): This is a method to apply middleware to the Express application.

    express.json(): This is a built-in middleware function that parses incoming JSON (JavaScript Object Notation) requests and populates the req.body property with the parsed JSON object. This is essential for handling API requests that send data in JSON format.
 */


// Connect to DB
// console.log(connectToDatabase);
connectToDatabase().then(() => {

        // console.log('connection established with database');

        app.use('/users', usersRouter);
        app.use('/sessions', sessionsRouter);
        app.use('/materials', materialRouter);
        app.use('/bookedSessions', bookedSessionRoutes);
        app.use('/reviews', reviewRoutes);
        app.use('/notes', noteRoutes)
        app.use('/create-payment-intent', stripeRoute)


        app.listen(port, () => console.log(`Server running on port`, port));
    }).catch(err => {
        console.error('Failed to start server:', err);
    });

    app.get('/', (req, res) => {
        res.send('hello there, server here!')
    })









/**
 these are the tasks that these server.js is doing
    1. initializing the express server in a port
    2. establishing connection with mongodb
 * **/