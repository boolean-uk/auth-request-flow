const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = "Loza's_super_secure_secret"; 

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
    if(mockUser.username === username && mockUser.password === password){
        const token = jwt.sign({mockUser, secret})
            return res.status(201).json({token})
        }
        return res.status(401).json({err: 'The credentials provided are incorrect'})
});
router.get('/profile', (req, res) => {
  const requestToken = req.headers.authorization.slice(7)
try{
    const verifyToken = jwt.verify(requestToken, secret)
    res.status(200).json({profile: verifyToken.profile})
}
catch(err){
    res.status(401).json({err: 'User cannot be verified '})
}
});

module.exports = router;
