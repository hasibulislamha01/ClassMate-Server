/*
    1. imports necessary logics for session's operation
    2. operates http requests (get, post, patch, delete) for session's
    
*/

const express = require('express')
const sessionRouter = express.Router()
const {getAllSessions} = require('../controllers/sessionController')

sessionRouter.get('/', getAllSessions)

module.exports = sessionRouter