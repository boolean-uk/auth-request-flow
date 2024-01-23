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

    if(username === mockUser.username && password === mockUser.password) {
        return res.json(jwt.sign({ username: username }, secret))
    }
    else {
        res.status(400).json('Error')
    }

});

router.get('/profile', (req, res) => { 

    const token = req.header('authorization')

    try {
        jwt.verify(token, secret);
        res.json({ user: mockUser.profile})
      } catch(err) {
        res.status(498).json({error: err})
      }
});


module.exports = router;
