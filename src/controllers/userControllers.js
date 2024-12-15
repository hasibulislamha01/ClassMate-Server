/*
    1. contains all the logics (functions) related to user opeartions (we are not gonna call the functions inside this file)
    
    2. returns the logics so that it can be used on other files
*/


const { ObjectId } = require('mongodb');
const {usersCollection} = require('../Config/database')

async function saveUser(req, res) {
    const userData = req.body;
    try {
        console.log(userData);
        // const result = await usersCollection.insertOne(userData);
        res.send(userData);
    } catch (error) {
        res.status(500).send({ message: "Failed to save user", error });
    }
}

async function getAllUsers(req , res) {
    try {
        const result = await usersCollection?.find()?.toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch users", error });
    }
}

module.exports = { getAllUsers, saveUser };
