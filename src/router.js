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
  const payload = { username: mockUser.username };
  //   const payload = req.headers.payload;

  const token = jwt.sign(payload, secret);
  return res.status(201).json({ token: token });
});

router.get("/profile", (req, res) => {});

module.exports = router;
