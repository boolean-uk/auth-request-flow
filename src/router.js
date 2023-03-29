const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

router.post("/login", (req, res) => {
  if (
    req.body.password === mockUser.password &&
    req.body.username === mockUser.username
  ) {
    const token = jwt.sign(
      { username: mockUser.username },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } else {
    res.status(400).json({ error: "Invalid username or password" });
  }
});

router.get("/profile", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ profile: mockUser.profile });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
