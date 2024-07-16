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

    try {

        if (username !== mockUser.username || password !== mockUser.password) {
            return res.status(401).json({ error: 'username or password incorrect, try again!' })
        }
        else {
            const payload = { username: mockUser.username }
            const secret = process.env.JWT_SECRET
            const token = jwt.sign((payload), secret, { algorithm: 'HS256' })
            return res.status(200).json({ token: token })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
});

router.get('/profile', (req, res) => {
    const [bearer, token] = req.get('Authorization').split(' ')
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        
        res.status(200).json({
                profile: mockUser.profile
            })
    } catch (error) {
        console.error(error)
        res.status(401).json({ error: 'Invalid credentials' })
    }
});


module.exports = router;
