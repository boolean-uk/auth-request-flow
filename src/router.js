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
  const { username } = req.body

  const payload = { username: username }

  try {
    const jwtToken = jwt.sign(payload, secret)

    res.status(201).json({ jwtToken })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
})

router.get('/profile', (req, res) => {
  const { authorization } = req.headers

  try {
    const profile = jwt.verify(authorization.split('Bearer')[1].trim(), secret)

    res.status(200).json({ data: profile })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
})

module.exports = router
