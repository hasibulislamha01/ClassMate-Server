const express = require('express')
const reviewRoutes = express.Router()
const { reviewsCollection } = require('../Config/database')


reviewRoutes.post('/', async (req, res) => {
    try {
        const review = req.body
        const result = await reviewsCollection.insertOne(review)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to add the review", error })
    }
})



module.exports = reviewsCollection