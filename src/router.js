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
        const token = jwt.sign({payload: mockUser.username}, secret)
        res.send({token})

    } else {
        throw new Error("The username or password is not correct.")
    }


});

router.get('/profile', (req, res) => {
    const token = req.header('authorization')
    console.log('This is all the headers', req.headers)

    try {
        const auth = jwt.verify(token.slice(7), secret)
        console.log(auth)
        res.send({profile: mockUser.profile})
    } catch (e) {
       
        throw new Error("Incorrect token")
    }
      
  
});


module.exports = router;
