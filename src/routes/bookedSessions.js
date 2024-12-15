const express = require('express')
const bookedSessionRoutes = express.Router()
const { bookedSessionCollection } = require('../Config/database')


// creating booked session
bookedSessionRoutes.post('/', async (req, res) => {
    try {
        const bookedSessionData = req.body
        // console.log(bookedSessionData)
        const result = await bookedSessionCollection.insertOne(bookedSessionData)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to book session", error })
    }
})


// fetching booked sessions
bookedSessionRoutes.get('/', async (req, res) => {
    try {
        const result = await bookedSessionCollection.find().toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch session data", error })
    }
})

// getting all the booked session for an specific student
bookedSessionRoutes.get('/:email', async (req, res) => {
    try {
        const email = req.params.email
        const query = { studentEmail: email }
        const result = await bookedSessionCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch the booked sessions for the student", error })
    }
})


bookedSessionRoutes.get('/status/:email', async (req, res) => {
    try {
        const email = req.params.email
        const query = { studentEmail: email }
        const options = {
            projection: { sessionId: 1 },
        }
        const result = await bookedSessionCollection.find(query, options).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to " })
    }
})



module.exports = bookedSessionRoutes;