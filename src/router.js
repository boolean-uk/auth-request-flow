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

    const login = req.body
    console.log('this ia login',login)
    console.log('this is mockuser',mockUser.username)

    if(login.username === mockUser.username  && login.password === mockUser.password){
        const token = jwt.sign({ username: mockUser.username }, secret)
        res.status(200).json({ token })
       // console.log(true)
    }else{
        res.status(401).json({'Error': 'username & password do not match'})
    }
    
});

router.get('/profile', (req, res) => {

    const token = req.headers.authorization.split(' ')
    // console.log(token)

    try {

        const authorization = jwt.verify(token[1], secret)
        res.status(200).json({ authorization })
    }
    catch{

        res.status(401).json({'Error ': 'invalid token'})
    }


});



module.exports = router;
