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

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign(mockUser, secret);
    return res.status(201).send({ token });
  }

  return res.status(401).send({
    error: "Your username or password is incorrect. Please try again.",
  });
});

router.get("/profile", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(token, secret);

    return res.status(200).send({ profile: verifiedToken.profile });
  } catch (e) {
    return res.status(e.status ?? 500).send({ error: e.message });
  }
});

module.exports = router;
