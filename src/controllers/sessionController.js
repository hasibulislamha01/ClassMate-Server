/*
    1. contains all the logics (functions) related to sessions opeartions (we are not gonna call the functions inside this file)
    
    2. exports the logics so that it can be used on other files
*/


const { sessionsCollection } = require('../Config/database')

async function getAllSessions(req, res) {
    try {
        const result = await sessionsCollection.find().toArray()
        res.send(result)
    } catch (error) {
        console.log('Failed to fetch all sessions', error);
    }
}

module.exports = {getAllSessions}