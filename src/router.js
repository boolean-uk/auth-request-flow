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
    const {username, password} = req.body
    if (username === mockUser.username && password === mockUser.password) {
    return res.json(
        jwt.sign (
            {username: username}
            , secret)
            )
        }
    else {
        return res.json (
                "BUT WHY AM I WRONG"
        )
    }

});

router.get('/profile', (req, res) => {
  
    const token = req.header('authorization').split(" ")[1]
    
        try {
              jwt.verify(token, secret, );

             return res.json(mockUser.profile)
            }
            
        catch (e) {
            return res.json(
                    {e})
                }
});


module.exports = router;
