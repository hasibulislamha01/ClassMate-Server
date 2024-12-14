const express = require('express');
const { getAllUsers } = require('../controllers/userControllers');

const router = express.Router();

// router.post('/', saveUser); // Save user data
router.get('/', getAllUsers); // Get all users

module.exports = router;
