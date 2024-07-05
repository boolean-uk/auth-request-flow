const express = require('express');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN

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
        const token = jwt.sign({ "username": mockUser.username }, secret)

        res.status(201).json({
            token
        })
    } else {
        res.status(401).json({
            error: "Ivalid username or password"
        })
    }
});

router.get('/profile', (req, res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            error: "Token not found"
        })
    }

    jwt.verify(token, secret, (err) => {
        if (err) {
            return res.status(403).json({
                error: "Token is not valid"
            })
        }

        res.json(mockUser.profile)
    })
});

module.exports = router;
