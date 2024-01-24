const express = require('express')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const router = express.Router()

// Storage
const users = [
  {
    username: 'authguy',
    password: 'mypassword',
    profile: {
      firstName: 'Chris',
      lastName: 'Wolstenholme',
      age: 43
    }
  },
  {
    username: 'Nazar',
    password: '123123123',
    profile: {
      firstName: 'Nazar',
      lastName: 'Tymiv',
      age: 18
    }
  }
]

// Global functions
const getUserByUserName = (username) => {
  const foundUser = users.find((user) => user.username === username)

  if (!foundUser) {
    const error = new Error('User with provided username not found')
    error.status = 404
    throw error
  }

  return foundUser
}

const checkPassword = (user, password) => {
  const checkedPassword = String(user.password) === String(password)

  if (!checkedPassword) {
    const error = new Error(`Password for ${user.username} is wrong`)
    error.status = 401
    throw error
  }

  return true
}

// Routers
router.post('/login', (req, res) => {
  const { username, password } = req.body

  try {
    const foundUser = getUserByUserName(username)
    checkPassword(foundUser, password)

    const jwtToken = jwt.sign(foundUser.profile, secret)

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
