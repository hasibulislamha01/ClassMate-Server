const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userControllers');


// router.post('/', saveUser); // Save user data
router.get('/', getAllUsers); // Get all users

module.exports = router;
