const express = require('express')
const noteRoutes = express.Router()
const { notesCollection } = require('../Config/database')

// creating note
noteRoutes.post('/', async (req, res) => {
    try {
        let query = {}
        const data = req.body
        const {sessionId} = req.query
        console.log(data)
        if(sessionId) query.sessionId = sessionId

        const result = await notesCollection.insertOne(data)
        res.send(result)
    } catch (error) {
        res.status().send({ message: "failed to save the note", error })
    }
})


// getting all notes (all, specific student)
noteRoutes.get('/', async (req, res) => {
    try {
        const { studentEmail } = req.query
        let query = {}
        if (studentEmail) query.studentEmail = studentEmail
        const result = await notesCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch notes data", error })
    }
})

noteRoutes.get('/counts', async (req, res) => {
    try {
        const { studentEmail, bookedSessionId } = req.query
        let query = {}
        if (studentEmail) query.studentEmail = studentEmail
        if (bookedSessionId) query.bookedSessionId = bookedSessionId
        const count = await notesCollection.countDocuments(query)
        res.status(200).json({count, query})
    } catch (error) {
        res.status(500).send({ message: "failed to fetch notes data", error })
    }
})

// getting notes of an specific student
// noteRoutes.get('/:email', async (req, res) => {
//     try {
//         const email = req.params.email
//         const query = { studentEmail: email }
//         const result = await notesCollection.find(query).toArray()
//         res.send(result)
//     } catch (error) {
//         res.status(500).send({ message: "failed to fetch student's note", error })
//     }
// })


// updating notes of an specific student
noteRoutes.patch('/:email', async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({ message: "failed to update the note", error })
    }
})


// deleting a note 
noteRoutes.delete('/:email', async (req, res) => {
    try {
        const email = req.params.email
        const query = { studentEmail: email }
        const result = await notesCollection.deleteOne(query)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to delete the note", error })
    }
})



module.exports = noteRoutes
