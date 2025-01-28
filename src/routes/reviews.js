const express = require('express')
const reviewRoutes = express.Router()
const { reviewsCollection } = require('../Config/database')


// posting a review
reviewRoutes.post('/', async (req, res) => {
    try {
        const review = req.body
        if (!review.reviewerEmail) throw new Error('reviewer email is required')
        const result = await reviewsCollection.insertOne(review)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to add the review", error })
    }
})

// getting all reviews
reviewRoutes.get('/', async (req, res) => {
    try {
        const { reviewerEmail } = req.query
        let query = {}
        if (reviewerEmail) query.userEmail = reviewerEmail
        const result = await reviewsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch reviews", error })
    }
})

// getting review counts
reviewRoutes.get('/counts', async (req, res) => {
    try {
        const { reviewerEmail } = req.query
        let query = {}
        if (reviewerEmail) query.userEmail = reviewerEmail
        const result = await reviewsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "failed to fetch reviews", error })
    }
})


// getting average rating for a session
reviewRoutes.get('/average/:sessionId', async (req, res) => {
    const id = req.params.sessionId;
    const query = { sessionId: id };

    try {
        const reviews = await reviewsCollection.find(query).toArray();
        const reviewCounts = reviews.length;

        const total = reviews.reduce((acc, review) => acc + review.ratingValue, 0);
        const averageRating = reviewCounts > 0 ? total / reviewCounts : 0;

        res.status(200).json({
            rating: averageRating,
            message: `Average rating found for the sessionId: ${id}`
        });
    } catch (error) {
        res.status(500).send({ message: "failed to fetch reviews", error });
    }
});


module.exports = reviewRoutes