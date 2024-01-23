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

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Both username and password are required" });
  }

  if (username === mockUser.username && password === mockUser.password) {
    const payload = { username: req.body.username };

    try {
      const token = jwt.sign(payload, secret);
      return res.status(201).json({ token: token });
    } catch (error) {
      res.status(500).json({ error: "Error occured" });
    }
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

router.get("/profile", (req, res) => {
  const tokenHeader = req.headers.authorization;
  console.log(tokenHeader);

  const token = tokenHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    return res.json({ profile: mockUser.profile });
  });
});

module.exports = router;
