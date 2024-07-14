const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = process.env.JWT_SECRET

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
    if(username === mockUser.username && password ===mockUser.password) {
        const payload = { username : mockUser.username}
        const token = jwt.sign(payload, secret )
        // console.log(token)
        res.json({token : token})
    } else {
        res.json({ message : 'Username & Password are wrong'})
    }
    
});

router.get('/profile', (req, res) => {

    const authHeader = req.headers.authorization
    
    console.log('Authorization Header:', authHeader)

    if(!authHeader) {
        return res.json({message : 'authorization faild'})
    }

    try {
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) {
            return res.json({ message: 'No token provided' })
        } else {
            jwt.verify(token, secret ,(err, user) => {
                if(err) {
                    return res.json({message : 'invalid token!'})
                }
                return res.json({ profile : mockUser.profile})
            } )
        }
    } catch (error) {
        return res.json(error)
    }
});


module.exports = router;
