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
  //   const payload = { username: mockUser.username };
  const payload = { username: req.body.username };

  try {
    const token = jwt.sign(payload, secret);
    return res.status(201).json({ token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
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
