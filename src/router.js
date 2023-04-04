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
  const mockUser = req.body;
  try {
    if (username === !mockUser.username ||
      password === !mockUser.password) {
      throw new Error('Invalid credentials');
    } else {
      const token = jwt.sign({ username: mockUser.username }, process.env.JWT_SECRET)
      res.json({ token })
    }
  } catch (error) {
    return res.status(401).json({ error: error })
  }

});



router.get('/profile', (req, res) => {
  //extract the JWT from headers
  //validate it, if valid, proceed, otherwise send error
  // if valid we return the users profile data
  console.log("PROFILE", req.headers);
  const token = req.headers.authorization.split(" ")[1]
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({ profile: mockUser.profile })
  } catch (e) {
    return res.status(401).json({ error: e })
  }


});


module.exports = router;
