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

    const token = jwt.sign({payload: mockUser.username}, secret)

    res.send({token})

});

router.get('/profile', (req, res) => {
    const token = req.header("Authorization")
    console.log(token)


    try {
        const auth = jwt.verify(token, secret)
        console.log(auth)
        res.send({profile: mockUser.profile})
    } catch (e) {
       
        throw new Error("Incorrect token")
    }
      
  
});


module.exports = router;
