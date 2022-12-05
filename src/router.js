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
    const {username, password} = req.body
    if(username !== mockUser.username || password !== mockUser.password){
        return "invalid credentials"
    }
  const token = jwt.sign({ username: "authguy" }, "mysecret");
  res.json(token);
});

router.get("/profile", (req, res) => {
  try {
    const auth = req.get("Authorization");
    jwt.verify(auth, "mysecret")
    return res.json(mockUser.profile)
  } catch (e) {
    return "custom error"
  }
});

module.exports = router;
