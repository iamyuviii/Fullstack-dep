const express = require('express');
const router = express.Router();
const { test, registeruser, loginUser, getprofile } = require('../Controllers/authcontr');

const cors = require('cors');

// middleware 
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

router.get('/', test);
router.post('/register', registeruser);
router.post('/login', loginUser);
router.get('/profile', getprofile);

module.exports = router;
