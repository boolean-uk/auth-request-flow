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
    const { username, password } = req.body
    if (username === mockUser.username && password === mockUser.password) {
        const token = jwt.sign(mockUser.username, secret)
        res.json({ token })
    }
    res.status(400).json({ error: "username or password field is incorrect" })


});

router.get('/profile', (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    try {
        jwt.verify(token, secret)
        res.json(mockUser.profile)
    } catch (e) {
        res.json({ error: e.message })
    }
});


module.exports = router;
