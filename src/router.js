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
    const token = jwt.sign(mockUser.username, secret);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

router.get("/profile", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      res.json(decoded);
    }
  });
});
module.exports = router;
