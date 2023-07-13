const express = require('express');
const jwt = require('jsonwebtoken');

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

const secret = process.env.JWT_SECRET

router.post('/login', (req, res) => {
    const { username, password } = req.body
    try {
        if (username === mockUser.username && password === mockUser.password) {
            const payload = { username }
            const token = jwt.sign(payload, secret)
            res.json({ token })
        } else {
            res.status(401).json({ error: 'Invalid username or password entered'})
        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

router.get('/profile', (req, res) => {
    // console.log(req.headers)
    // user token is at req.headers.authorization
    // split split req.headers.authorization in to "bearer" and "token" and extract just the token
    const payload = req.headers.authorization.split(' ')[1]
    try {
        jwt.verify(payload, secret)
        res.json({ mockUser })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});


module.exports = router;
