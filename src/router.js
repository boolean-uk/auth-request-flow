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
  try {
    const jwtToken = jwt.sign({ username: mockUser.username }, secret)

    res.status(201).json({ jwtToken })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
})

router.get('/profile', (req, res) => {})

module.exports = router
