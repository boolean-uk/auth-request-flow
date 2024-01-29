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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, secret);
    next();
  } catch (e) {
    if (e.message === "jwt malformed") {
      res.status(401).json({ error: "Authentication failed" });
    } else if (e.message === "invalid signature") {
      res.status(403).json({ error: "Not authorized" });
    }
  }
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== mockUser.username || password !== mockUser.password) {
    res.status(401).json({ error: "Password/username is incorrect" });
    return;
  }

  const newJwt = jwt.sign({ username, password }, secret);
  res.status(201).json({ newJwt });
});

router.get("/profile", verifyToken, (req, res) => {
  res.json({ profile: mockUser.profile });
});

module.exports = router;
