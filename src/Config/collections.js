const {client} = require('./database')
const dbName = 'ClassMate'

const db = client?.db(dbName)

const usersCollection = db?.collection('users')
console.log('user collection', usersCollection);
// const sessionsCollection = client.db(dbName).collection('sessions')
// const materialsCollection = client.db(dbName).collection('materials')
// const bookedSessionCollection = client.db(dbName).collection('bookedSessions')
// const reviewsCollection = client.db(dbName).collection('reviews')
// const notesCollection = client.db(dbName).collection('notes')

module.exports = {
    usersCollection,
    // sessionsCollection,
    // materialsCollection,
    // bookedSessionCollection,
    // reviewsCollection,
    // notesCollection
}
