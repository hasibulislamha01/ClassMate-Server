/**
 *      1. imports necessary logics for users operation
 *      2. operates http requests (get, post, patch, delete)
 */

const express = require('express');
const userRouter = express.Router();
const { usersCollection } = require('../Config/database')

/*
const userRouter = express.Router();: 
This line creates a new router object, userRouter, using the express.Router() function. 
A router is a mini-application within Express that allows you to group related routes together and manage them separately.
*/

userRouter.post('/test', async (req, res) => {
    const userData = req.body;
    try {
        console.log("test api", userData);
        const query = { userEmail: userData.email }
        const result = await usersCollection.findOne(query)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "Failed to save user", error });
    }
})

// check the user is already existing or not. if not, then create the user
userRouter.post('/', async (req, res) => {
    const userData = req.body;
    try {
        // console.log(userData);
        const query = { userEmail: userData?.userEmail };
        const isUserOld = await usersCollection.findOne(query)
        console.log('finding user...', isUserOld);
        if (isUserOld) { res.send({ message: "Welcome Back" }) }
        else {
            const result = await usersCollection.insertOne(userData);
            res.send(result);
        }
    } catch (error) {
        res.status(500).send({ message: "Failed to save user", error });
    }
});

userRouter.get('/', async (req, res, next) => {
    try {
        const result = await usersCollection.find().toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "Failed to get user", error })
    }
});

// updating user role
userRouter.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newRoleObject = req.body
        const newRole = newRoleObject.role
        // console.log(newRole, newRoleObject)
        const filter = { _id: new ObjectId(id) }
        const updateDoc = {
            $set: {
                role: newRole
            }
        }
        const result = await usersCollection.updateOne(filter, updateDoc)
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "Failed to update user role", error })
    }
})


// getting user role
userRouter.get('/:email/role', async (req, res) => {
    try {
        const email = req.params.email;
        const query = { userEmail: email };
        const options = {
            projection: { role: 1 },
        }
        const role = await usersCollection.findOne(query, options)
        res.send(role)
    } catch (error) {
        res.status(500).send({ message: "failed to get user role", error })
    }
})

// getting all the tutors
userRouter.get('/role/tutors', async (req, res) => {
    try {
        const query = { role: "Tutor" }
        const result = await usersCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "can not fetch tutors", error })
    }
})



module.exports = userRouter;
