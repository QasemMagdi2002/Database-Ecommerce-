const express = require('express');
const { registerUser, loginUser, protect } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser); // Public
router.post('/login', loginUser); // Public

module.exports = router;
