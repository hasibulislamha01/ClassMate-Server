/**
 *  1. imports necessary logics for session's operation
 *   2. operates http requests (get, post, patch, delete) for session's
 */

const express = require('express')
const { ObjectId } = require('mongodb');
const sessionRouter = express.Router()
const { sessionsCollection } = require('../Config/database');


// creating a new session
sessionRouter.post('/', async (req, res) => {
    try {
        const sessionData = req.body;
        // console.log(sessionData)
        const result = await sessionsCollection?.insertOne(sessionData)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed create the session", error })
    }
})

// getting sessions (for all users, student, tutors)
sessionRouter.get('/', async (req, res) => {
    const { status, tutorEmail } = req.query
    let query = {}
    if (status) query.status = status
    if (tutorEmail) query.tutorEmail = tutorEmail
    // console.log(query);
    try {
        const result = await sessionsCollection?.find(query).toArray()
        res.send(result)
    }
    catch (error) {
        res.status(500).send({ message: "failed to get the session you requested", error })
    }
})

// getting approved session _________ (delete the route because we are handling this by query parameter from now on)
sessionRouter.get('/bookable', async (req, res) => {
    try {
        const query = { status: "approved" || 'renewed' }
        const result = await sessionsCollection?.find(query).toArray()
        console.log(result);
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch approved sessions", error })
    }
})

// getting high rated session
sessionRouter.get('/')

// getting counts value
sessionRouter.get('/counts', async (req, res) => {
    const { tutorEmail } = req.query
    let query = {}
    if (tutorEmail) { query.tutorEmail = tutorEmail }
    console.log(query);

    try {
        const result = await sessionsCollection.countDocuments(query)
        res.status(200).json({ query: tutorEmail, count: result })
    } catch (error) {
        res.status(500).send({ message: "failed to fetch the session counts for the query", error })
    }
})

// getting calender history:
// sessionRouter.get('/history', async(req, res)=> {
//     try{
//         const {tutorEmail} = req.params
//         let query = {}
//         if (tutorEmail) query.tutorEmail = tutorEmail
//         const tutorsSessions = await sessionsCollection.find(query).toArray()
//     }
// })

// getting an specific session
sessionRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await sessionsCollection?.findOne(query)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to get the session you requested", error })
    }
})


// updating session (updating session price)
// const { ObjectId } = require("mongodb");

sessionRouter.patch('/:id', async (req, res) => {

    // ----------- DANGER:
    // The body must be an array of objects with the following formats: { "updatableKey": "status", "value": 'approved' },
    
    try {
        const id = req.params.id;
        const updates = req.body;

        console.log('Received ID:', id);
        console.log('Received Updates:', updates);

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const filter = { _id: new ObjectId(id) };

        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({ error: "Invalid updates format" });
        }

        const updateDoc = {};
        updates.forEach(({ updatableKey, value }) => {
            updateDoc[updatableKey] = value;
        });

        console.log('Final Update Document:', updateDoc);

        const options = { upsert: false };
        const result = await sessionsCollection.updateOne(filter, { $set: updateDoc }, options);

        if (result.modifiedCount > 0) {
            res.json({ message: "Document updated successfully", result });
        } else if (result.matchedCount > 0) {
            res.json({ message: "Document already up to date", result });
        } else {
            res.status(404).json({ message: "Document not found" });
        }
    } catch (error) {
        console.error('Error in PATCH /sessions/:id:', error);
        res.status(500).json({ error: error.message });
    }
});



// updating session
sessionRouter.patch('/request/:id', async (req, res) => {
    try {
        const id = req.params.id
        const info = req.body
        const newStatus = info.newStatus
        console.log('info and new status are ', info, newStatus)
        const filter = { _id: new ObjectId(id) }
        const updateDoc = {
            $set: {
                status: newStatus,
            }
        }
        const result = await sessionsCollection?.updateOne(filter, updateDoc)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to update session", error })
    }
})

// deleting session
sessionRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log('delete id', id)
        const query = { _id: new ObjectId(id) }
        const result = await sessionsCollection?.deleteOne(query)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to delete the session", error })
    }
})




module.exports = sessionRouter
