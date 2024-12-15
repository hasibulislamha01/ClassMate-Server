/*
    1. imports necessary logics for session's operation
    2. operates http requests (get, post, patch, delete) for session's
    
*/

const express = require('express')
const sessionRouter = express.Router()
const { getAllSessions } = require('../controllers/sessionController')


// creating a new session
sessionRouter.post('/sessions', async (req, res) => {
    try {
        const sessionData = req.body;
        // console.log(sessionData)
        const result = await sessionsCollection.insertOne(sessionData)
        res.send(result)
    } catch (error) {
        res.status(500).send({message: "failed create the session", error})
    }
})

// getting all sessions
sessionRouter.get('/sessions', async (req, res) => {
    const result = await sessionsCollection.find().toArray()
    res.send(result)
})

// getting approved session
sessionRouter.get('/sessions/approved', async (req, res) => {
    try{
        const query = { status: "approved" }
    const result = await sessionsCollection.find(query).toArray()
    res.send(result)
    } catch(error){
        res.status(500).send({message: "failed to fetch approved sessions", error})
    }
})


module.exports = sessionRouter