const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

const secret = process.env.JWT_SECRET;

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== mockUser.username || password !== mockUser.password) {
    res.status(400).json({ error: "Invalid username or password" });
  }
  const token = jwt.sign({ username }, secret);
  res.json({ token });
});

router.get("/profile", (req, res) => {
  try {
    let bearer = req.headers.authorization;
    bearer = bearer.replace("Bearer ", "");
    jwt.verify(bearer, secret);
    return res.json({ profile: mockUser.profile });
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
