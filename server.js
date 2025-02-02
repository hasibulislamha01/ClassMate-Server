const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectToDatabase } = require('./src/Config/database');

const usersRouter = require('./src/routes/usersRoutes');
const sessionsRouter = require('./src/routes/sessionRoutes');
const materialRouter = require('./src/routes/materials');
const bookedSessionRoutes = require('./src/routes/bookedSessions');
const reviewRoutes = require('./src/routes/reviews');
const noteRoutes = require("./src/routes/notes");
const stripeRoute = require('./src/routes/stripe');

const app = express();
const port = process.env.PORT || 5000;

// CORS setup
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://classmate-ac788.web.app",
        "https://classmate-ac788.firebaseapp.com",
    ]
}));

app.use(express.json());

// Connect to MongoDB
connectToDatabase().then(() => {
    console.log('✅ Connection established with database');

    // Request Logging Middleware
    app.use((req, res, next) => {
        console.log(`📢 Received ${req.method} request at ${req.url}\n`);
        next();
    });

    // Define Routes
    app.use('/users', usersRouter);
    app.use('/sessions', sessionsRouter);
    app.use('/materials', materialRouter);
    app.use('/bookedSessions', bookedSessionRoutes);
    app.use('/reviews', reviewRoutes);
    app.use('/notes', noteRoutes);
    app.use('/create-payment-intent', stripeRoute);

    // Root Route (Moved Inside)
    app.get('/', (req, res) => {
        res.send('👋 Hello there, server here!');
    });


    // Start Server
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

}).catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1); // Exit process on database connection failure
});
