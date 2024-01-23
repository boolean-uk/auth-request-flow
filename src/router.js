const express = require('express');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
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
        const payload = mockUser
        const token = jwt.sign(payload, secret)
        return res.status(201).json({ token })
    }
    return res.status(401).json({ error: 'The password or username provided is incorrect' })

});


router.get('/profile', (req, res) => {
    const token = req.headers.authorization.split(" ")[1]

    try {
        jwt.verify(token, secret,)
        return res.json(mockUser.profile)
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

});

console.log(secret)


module.exports = router;


