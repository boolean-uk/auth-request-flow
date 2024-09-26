const express = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

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
  const { username, password } = req.body;
  const token = jwt.sign({ payload: mockUser.username }, secret);

  if (username === mockUser.username && password === mockUser.password) {
    res.status(201).json({ token });
  } else {
    res.status(404).json({ message: "username and password do not match" });
  }
});

router.get("/profile", (req, res) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  try {
    jwt.verify(token, secret);
    res.json({ mockUser });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
