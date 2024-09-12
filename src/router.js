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
    const { username, password } = req.body
    if(username != mockUser.username || password != mockUser.password) return res.json({error: 'incorrect username or password'});

    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.JWT_SECRET)
    res.json({ accessToken: accessToken})
});

router.get('/profile', authenticateToken, (req, res) => {
    res.json(mockUser.username === req.user.name)
});

function authenticateToken(req, res, next){
    const autheader = req.headers['authorization'];
    const token = autheader && autheader.split(' ')[1];

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    }) 
}


module.exports = router;
