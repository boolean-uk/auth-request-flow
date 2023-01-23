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
  const token = jwt.sign({ username: mockUser.username }, secret);
  res.json({ token });
});

router.get("/profile", (req, res) => {});

module.exports = router;
