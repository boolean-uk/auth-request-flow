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
        const token = jwt.sign(mockUser, secret)
        return res.status(201).json({ token })
    }
    return res.status(401).json({ error: "incorrect login credentials provided"})
});

router.get('/profile', (req, res) => {
    const requestToken = req.headers.authorization.slice(7)

    try {
        const verifyToken = jwt.verify(requestToken, secret)
        res.status(200).json({ profile: verifyToken.profile })
    }
    catch (err) {
        res.status(401).json({ error: "Could not verify user"})
    }
});

module.exports = router;
