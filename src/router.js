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

router.post('/login', (req, res) => {
    const username = mockUser.username
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.JWT_SECRET)
    res.json({ accessToken: accessToken})
});

router.get('/profile', (req, res) => {
  
});


module.exports = router;
