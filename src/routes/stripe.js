const express = require('express')
const stripeRoute = express.Router()


stripeRoute.post("/", async (req, res) => {
    try {
        const sessionData = req.body;
        // console.log(items)
        const price = parseInt(sessionData.registrationFee) * 100

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: "usd",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });
        // console.log(items)
        res.send({
            clientSecret: paymentIntent.client_secret,
            // success: items
        });
    } catch (error) {
        res.status(500).send({ message: "failed to complete payment", error })
    }
})


module.exports = stripeRoute