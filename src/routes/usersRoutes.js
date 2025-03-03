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


// getting users data (both all and query)
userRouter.get('/', async (req, res, next) => {
    const role = req?.query.role
    const gender = req.query.gender

    let query = {}
    if (role && gender) query = { role, gender }
    else if (role) query = { role }
    else if (gender) query = { gender }
    console.log(query);

    try {
        const result = await usersCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: "Failed to get user", error })
    }
});



// Get the number of users with a specific role
userRouter.get('/counts', async (req, res) => {
    // console.log('Route hit');
    const userRole = req.query.role;
    // console.log('Role:', userRole);

    const query = {};
    if (userRole) query.role = userRole;
    // console.log('Query:', query);

    try {
        const userCount = await usersCollection.countDocuments(query);
        //   console.log('User count:', userCount);

        // Send the user count in the response body
        res.status(200).json({ role: userRole, count: userCount });
    } catch (error) {
        console.error('Error:', error);
        // Send a proper error response with a meaningful message
        res.status(500).json({ message: 'An error occurred while fetching user count' });
    }
})


// finding any specific user
userRouter.get('/:email', async (req, res) => {
    const email = req.params.email
    console.log('geiin', email);
    try {
        const query = { userEmail: email }
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
            res.send({ result, message: "Welcome to ClassMate" });
        }
    } catch (error) {
        res.status(500).send({ message: "Failed to save user", error });
    }
});


// Updating user information
userRouter.put('/:email', async (req, res) => {
    const email = req.params.email
    // console.log(email);
    const { userEmail, role, gender, phone } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'User email is required.' });
    }

    try {
        const query = { userEmail: email }
        const result = await usersCollection.updateOne(query,
            { $set: { role, gender, phone } });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});


// Deleting a user
userRouter.delete('/:email', async (req, res) => {
    const email = req?.params?.email
    try {
        console.log("deleting user with email", email)
        const query = { userEmail: email };
        const result = await usersCollection.deleteOne(query)
        res.status(200).send({ result, message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).send({ message: "Failed to delete the user" })
    }
})



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
