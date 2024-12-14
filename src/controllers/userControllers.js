const { ObjectId } = require('mongodb');
const {usersCollection} = require('../Config/collections')

// async function saveUser(req, res) {
//     const userData = req.body;
//     try {
//         const result = await req.db.collection('users').insertOne(userData);
//         res.send(result);
//     } catch (error) {
//         res.status(500).send({ message: "Failed to save user", error });
//     }
// }

async function getAllUsers(req, res) {
    try {
        const result = await usersCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch users", error });
    }
}

module.exports = { getAllUsers };
