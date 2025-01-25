const express = require('express')
const materialRouter = express.Router()
const { materialsCollection } = require('../Config/database')
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
    const { sessionId } = req.query
    let query = {}
    if (sessionId) query.sessionId = sessionId
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
materialRouter.get('/student/:id', async (req, res) => {
    try {
        const id = req.params.id
        // the id here is the session id of the material
        // console.log(id)
        const query = { sessionId: id }
        const result = await materialsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch the material student requested", error })
    }
})


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