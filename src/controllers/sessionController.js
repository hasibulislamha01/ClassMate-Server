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