const express = require('express');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

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

const header = {
  "alg": "HS256",
  "typ": "JWT"
}

router.post('/login', (req, res) => {
	const user = req.body
	const token = jwt.sign(user, secret)
	res.json({ token })
});

router.get('/profile', (req, res) => {
	const auth = req.header("authentication")
	const [_, token] = auth.split(" ")

	try {
		jwt.verify(token, secret)
		res.json({ profile: mockUser.profile })
	} catch (error) {
		res.status(401).json({ error: error.message })
	}
});

module.exports = router;
