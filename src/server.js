//-------------------------------------------------------------
/* ------------- this is the main server component ---------- */
//-------------------------------------------------------------


const express = require('express');
const { connectToDatabase } = require('./Config/database'); //importing connection function
const usersRouter = require('./routes/users');  //importing user routes 
// const sessionsRouter = require('./routes/sessions');
// ... other routes

const app = express();
const port = process.env.PORT || 5000
app.use(express.json());

// express(): This line creates an instance of the Express application. Express is a Node.js framework that simplifies the process of building web applications and APIs.

// app: This variable holds a reference to the newly created Express application. It will be used to define routes, middleware, and other configurations for the server.

// process.env.PORT: This checks for an environment variable named PORT. This is a common practice in web applications, especially when deploying to platforms like Heroku or AWS, where the platform assigns a dynamic port number.

// || 5000: If the PORT environment variable is not defined or is empty, the port variable is assigned the value 5000. This is a default port number often used for development and testing purposes.

// app.use(): This is a method to apply middleware to the Express application.

// express.json(): This is a built-in middleware function that parses incoming JSON (JavaScript Object Notation) requests and populates the req.body property with the parsed JSON object. This is essential for handling API requests that send data in JSON format.

// Connect to DB
// connectToDatabase().then(() => {
//     console.log('connectiion established 00000000000000000 fsdlkaj   ');
//     app.use('/api/users', usersRouter);
//     // app.use('/api/sessions', sessionsRouter);

//     app.listen(port, () => console.log(`Server running on port`, port));
// }).catch(err => {
//     console.error('Failed to start server:', err);
// });


app.get('/', (req, res) => {
    res.send('hello there, server here!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})