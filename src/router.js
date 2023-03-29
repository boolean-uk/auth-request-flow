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
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    res.json(jwt.sign({ username: mockUser.username }, secret));
  } else {
    res.status(400).json({ error: "Invalid user or password" });
  }
});

router.get("/profile", (req, res) => {
  const payload = req.headers.authorization.split(" ")[1];

  try {
    jwt.verify(payload, secret);
    res.json({ profile: mockUser.profile });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
