const express = require('express')
const bookedSessionRoutes = express.Router()
const { bookedSessionCollection } = require('../Config/database')


// creating booked session
bookedSessionRoutes.post('/', async (req, res) => {
    try {
        const bookedSessionData = req.body
        // console.log(bookedSessionData)
        const result = await bookedSessionCollection.insertOne(bookedSessionData)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to book session", error })
    }
})


// fetching booked sessions (all, specific student, specific tutor)
bookedSessionRoutes.get('/', async (req, res) => {

    const { sessionId, studentEmail, tutorEmail } = req.query
    let query = {};
    if (studentEmail) query.studentEmail =  studentEmail 
    if (tutorEmail) query.tutorEmail =  tutorEmail 
    if (sessionId) query.sessionId =  sessionId 
    // console.log(query);
    try {
        const result = await bookedSessionCollection.find(query).toArray()
        // console.log(result);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "failed to fetch session data", error })
    }
})

// getting the count booked sessions by student or sold by tutor
bookedSessionRoutes.get('/counts', async (req, res) => {
    const { studentEmail, tutorEmail } = req.query
    let query = {}
    if (studentEmail) query = { studentEmail }
    if (tutorEmail) query = { tutorEmail }
    try {
        const result = await bookedSessionCollection.countDocuments(query)
        res.status(200).json({ query: studentEmail || tutorEmail, count: result });
    } catch (error) {
        res.status(500).send({ message: "failed to fetch the booked sessions for the student", error })
    }
})

// getting revenue count
bookedSessionRoutes.get('/revenue', async (req, res) => {
    try {
        const { tutorEmail } = req.query
        let query = {}
        if (tutorEmail) query.tutorEmail = tutorEmail

        const bookedSessions = await bookedSessionCollection.find(query).toArray()
        // console.log(bookedSessions);
        let totalFee = 0
        bookedSessions?.forEach(session => {
            const sessionFee = parseInt(session.registrationFee)
            totalFee += sessionFee
            console.log(totalFee);
        })
        res.send({totalRevenue: totalFee, query})
    } catch (error) {
        res.status(500).send({ message: 'failed to get revenue value', error })
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