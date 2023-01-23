const express = require('express');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    const { username } = req.body
    const token = jwt.sign(username, secret)
    res.json({ token })
});

router.get('/profile', (req, res) => {

});


module.exports = router;
