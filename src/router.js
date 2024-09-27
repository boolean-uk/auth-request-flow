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

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === mockUser.username && password === mockUser.password) {
    const payload = { username: mockUser.username };
    const token = jwt.sign(payload, secret);
    res.json({ token });
  } else {
    res.status(400).json({ error: "Wrong username and password entered" });
  }
});

router.get("/profile", (req, res) => {
  const payloadArray = req.headers.authorization.split(" ");
  const payload = payloadArray[1];

  try {
    jwt.verify(payload, secret);
    res.json({ profile: mockUser.profile });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = router;
