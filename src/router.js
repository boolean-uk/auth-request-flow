const express = require("express");
const jwt = require("jsonwebtoken");

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

  if (username !== mockUser.username) {
    res.status(401).json({ error: "username / password do not match" });
    return;
  }

  if (password !== mockUser.password) {
    res.status(401).json({ error: "username / password do not match" });
    return;
  }

  const payload = { username: mockUser.username };
  const token = jwt.sign(payload, secret);
  res.json({ token });
});

router.get("/profile", (req, res) => {
  const [prefix, token] = req.headers.authorization.split(" ");
  try {
    jwt.verify(token, secret);
    res.json(mockUser);
  } catch (error) {
    res.status(401).json({error: "your token is 💩"});
  }
});

module.exports = router;
