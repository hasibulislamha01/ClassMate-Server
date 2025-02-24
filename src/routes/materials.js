const express = require('express')
const materialRouter = express.Router()
const { materialsCollection } = require('../Config/database')
const { bookedSessionCollection } = require('../Config/database')
const { ObjectId } = require('mongodb');



// creating a material
materialRouter.post('/', async (req, res) => {
    try {
        const materialsData = req.body
        console.log(materialsData)
        const result = await materialsCollection.insertOne(materialsData)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to create the material", error })
    }
})


// getting all materials
materialRouter.get('/', async (req, res) => {
    const { sessionId, tutorEmail } = req.query
    let query = {}
    if (sessionId) query.sessionId = sessionId
    if (tutorEmail) query.tutorEmail = tutorEmail
    try {
        const result = await materialsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch materials data", error })
    }
})


// getting material counts
materialRouter.get('/counts', async (req, res) => {
    try {
        const { sessionId } = req.query
        let query = {}
        if (sessionId) query.sessionId = sessionId
        const result = await materialsCollection.countDocuments(query)
        res.status(200).json({ count: result, query })
    } catch (error) {
        res.status(500).send({ message: 'internal server error (error while fetching materials count for the query)', error })
    }
})

// fetching materials that is purchased by student
materialRouter.get('/student/:email', async (req, res) => {
    try {
        const studentEmail = req.params.email;
        const query = { studentEmail };
        
        // Fetch booked sessions
        const bookedSessions = await bookedSessionCollection.find(query).toArray();
        const sessionIds = bookedSessions.map(session => session.sessionId);
        
        if (sessionIds.length === 0) {
            return res.send([]); // No sessions found, return empty array
        }

        // Fetch all materials in a single query
        const materials = await materialsCollection.find({ sessionId: { $in: sessionIds } }).toArray();
        
        console.log('Found student materials:', materials);
        res.send(materials);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).send({ message: "Failed to fetch the materials the student requested", error });
    }
});



// getting all the materials for a tutor
materialRouter.get('/:email', async (req, res) => {
    try {
        const email = req.params.email
        console.log(email)
        const query = { tutorEmail: email }
        const result = await materialsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch materials of the tutor", error })
    }
})


// deleting an specific material
materialRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log('deletable id: ', id)
        const query = { _id: new ObjectId(id) }
        const result = await materialsCollection.deleteOne(query)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to delete the material", error })
    }
})




module.exports = materialRouter