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

function createToken() {
  try {
    return jwt.sign({ username: mockUser.username }, secret);
  } catch (error) {
    console.error("Error creating token:", error);
    return null;
  }
}

router.post("/login", (req, res) => {
  const token = createToken();
  if (token) {
    res.json({ token });
  } else {
    res.status(500).json({ message: "Error creating token" });
  }
});

router.get("/profile", (req, res) => {
  try {
    const tokenFromAuth = req.header("Authorization");
    if (!tokenFromAuth) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = tokenFromAuth.split(" ")[1];
    jwt.verify(token, secret);
    res.json({ profile: mockUser.profile });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
