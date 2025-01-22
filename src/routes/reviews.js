const express = require('express')
const reviewRoutes = express.Router()
const { reviewsCollection } = require('../Config/database')


// posting a review
reviewRoutes.post('/', async (req, res) => {
    try {
        const review = req.body
        const result = await reviewsCollection.insertOne(review)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to add the review", error })
    }
})

// getting all reviews
reviewRoutes.get('/', async (req, res) => {
    try {
        const {reviewerEmail} = req.query
        let query = {}
        if (reviewerEmail) query.userEmail = reviewerEmail
        const result = await reviewsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch reviews", error })
    }
})


// getting average rating for a session
reviewRoutes.get('/:sessionId', async (req, res) => {
    // const {} = req.query
    const id = req.params.sessionId
    const query = {sessionId: id}
    try {
        const result = await reviewsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch reviews", error })
    }
})


module.exports = reviewRoutes