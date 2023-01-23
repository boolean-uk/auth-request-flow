const { json } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

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
  const token = jwt.sign({ username: mockUser.username }, secret);
  res.json({ token });
});

router.get("/profile", (req, res) => {
  try {
    let bearer = req.headers.authorization;
    bearer = bearer.replace("Bearer ", "");
    jwt.verify(bearer, secret);
    return res.json(mockUser.profile);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
