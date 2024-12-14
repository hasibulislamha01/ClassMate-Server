const express = require('express')
const router = express.Router()
const {getAllSessions} = require('../controllers/sessionController')

router.get('/', getAllSessions)

module.exports = router