const express = require("express");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const secret = process.env.JWT_TOKEN;

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

const createToken = (payload, secret) => {
  const token = jwt.sign(payload, secret);
  return token;
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "authguy" && password === "mypassword") {
    const payload = { username, password };
    const myToken = createToken(payload, secret);
    res.status(200).json({ status: "success", data: {"token": myToken, user: mockUser.profile} });
  } else {
    return res.status(404).send("Your email or password don't exist");
  }
});

router.get("/profile", (req, res) => {
  const my_token = req.header("my_token");

  try {
    const decoded = jwt.verify(my_token, secret);
    console.log(decoded);
    return res.send(mockUser.profile);
  } catch (error) {
    console.log("invalid token");
    return res.status(404).send("Wrong token");
  }
});

module.exports = router;
