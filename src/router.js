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
 const token = createToken()
 if(token){
    res.json({token})
 } else {
    res.status(500).json({message: 'Error creating token'})
 }
});

router.get("/profile", (req, res) => {});

module.exports = router;
