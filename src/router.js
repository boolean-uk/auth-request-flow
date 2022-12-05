const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

class WrongBodyCredentials extends Error {
  statusCode = 400;
}

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
  if (username !== mockUser.username || password !== mockUser.password) {
    throw new WrongBodyCredentials("Invalid username or password");
  }
  const token = jwt.sign({ username: "authguy" }, "mysecret");
  res.json(token);
});

router.get("/profile", (req, res) => {
  try {
    const auth = req.get("Authorization");
    jwt.verify(auth, "mysecret");
    return res.json(mockUser.profile);
  } catch (e) {
    return "custom error";
  }
});

module.exports = router;
