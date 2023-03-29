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
  const token = jwt.sign({ username: req.body.username }, secret);

  res.json({ token });
});

router.get("/profile", (req, res) => {
  const tokenToVerify = req.headers.authorization.split(" ")[1];
  //   console.log(req.headers.authorization.split(" ")[1]);
  try {
    const decoded = jwt.verify(tokenToVerify, secret);
    res.json({ profile: mockUser.profile });
  } catch (error) {
    res.status(401).json({ error: "Not authorized!" });
  }
});

module.exports = router;
