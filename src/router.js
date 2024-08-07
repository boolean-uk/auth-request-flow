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
    const payload = {username}

    if( username === mockUser.username &&
        password === mockUser.password
    ) {
        const token = jwt.sign(payload, secret)

        res.status(200).json({
        login: token
        })
    } else {
        res.status(403).json({
            error: 'Credentials do not match'
        })
    }
});

router.get('/profile', (req, res) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(403).json({
            error: 'No credentials sent'
        })
    }
    const decoded = jwt.verify(authorization, secret)
    const profile = mockUser.profile

    res.status(200).json({
        user: profile
    })
});


module.exports = router;
