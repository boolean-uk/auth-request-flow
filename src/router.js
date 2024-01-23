const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

const secret = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { username, password } = req.body
  if  (username !== mockUser.username || password !== mockUser.password) {
    res.status(401).json({ error: "password/username is incorrect" });
    return
  }
    const newJwt = jwt.sign({ username, password }, secret);
    res.status(201).json({ newJwt });
});

router.get("/profile", (req, res) => {
  const token = req.headers.authorization;
  try {
      jwt.verify(token, secret);
      res.json({ profile: mockUser.profile });
  } catch (e) {
    if (e.message ===  "jwt malformed"){
        res.status(401).json({ error: "authentication failed"})
    }
    if (e.message ===  "invalid signature"){
        res.status(403).json({ error: "not authorised"})
    }
  }
});

module.exports = router;
