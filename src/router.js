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

const createToken = (payload, secret) => {
  return jwt.sign(payload, secret);
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== mockUser.username) {
    return console.log("incorrect username");
  }
  if (password !== mockUser.password) {
    return console.log("incorrect password");
  }
  try {
    const payload = { username, password };
    const token = createToken(payload, secret);
    res.send({
      status: "success",
      data: { token: token, user: mockUser.profile },
    });
  } catch (e) {
    console.log(e);
    return res.status(404).send("email or password not valid");
  }
});

router.get("/profile", (req, res) => {
  //split to remove bearer from the Authorization header
  const token = req.header("authorization").split(" ")[1];
  console.log("TOKEN", token);
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    return res.send(mockUser.profile);
  } catch (e) {
    console.log(e);
    return res.status(404).send("invalid token provided");
  }
});

module.exports = router;
