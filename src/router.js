const express = require('express')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const router = express.Router()

const mockUser = {
  username: 'authguy',
  password: 'mypassword',
  profile: {
    firstName: 'Chris',
    lastName: 'Wolstenholme',
    age: 43
  }
}

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === mockUser.username && password === mockUser.password) {
    res.status(201).json(jwt.sign({ username }, secret))
  } else {
    res.status(500).json('Error')
  }
})

router.get('/profile', (req, res) => {
  const tokenfromAuth = req.header('authorization')
  const token = tokenfromAuth.split(" ")[1]
  try {
    jwt.verify(token, secret)
    return res.json({ user: mockUser.profile })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
