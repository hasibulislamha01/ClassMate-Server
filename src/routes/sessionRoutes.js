/*
    1. imports necessary logics for session's operation
    2. operates http requests (get, post, patch, delete) for session's
    
*/

const express = require('express')
const sessionRouter = express.Router()
const { sessionsCollection } = require('../Config/database');
const { ObjectId } = require('mongodb');


// creating a new session
sessionRouter.post('/', async (req, res) => {
    try {
        const sessionData = req.body;
        // console.log(sessionData)
        const result = await sessionsCollection.insertOne(sessionData)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed create the session", error })
    }
})

// getting all sessions
sessionRouter.get('/', async (req, res) => {
    const result = await sessionsCollection.find().toArray()
    res.send(result)
})

// getting approved session
sessionRouter.get('/approved', async (req, res) => {
    try {
        const query = { status: "approved" }
        const result = await sessionsCollection.find(query).toArray()
        console.log(result);
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch approved sessions", error })
    }
})

// getting an specific session
sessionRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await sessionsCollection.findOne(query)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to get the session you requested", error })
    }
})

// getting session of an specific tutor
sessionRouter.get('/emailQuery/:email', async (req, res) => {
    try {
        const email = req.params.email
        // console.log('email query', email)
        const query = { tutorEmail: email }
        const result = await sessionsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to get your session", error })
    }
})


// updating session (updating session price)
sessionRouter.patch('/:id', async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({ message: "failed to update the session", error })
    }
})

// updating session
sessionRouter.patch('/request/:id', async (req, res) => {
    try {
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
        const result = await sessionsCollection.deleteOne(query)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to delete the session", error })
    }
})



module.exports = sessionRouter
