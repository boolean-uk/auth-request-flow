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

const secret = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  // TODO: CHECK FOR MOCHUSER MATCH
  const { username, password, profile } = req.body;
  try {
    if (
      username !== mockUser.username ||
      password !== mockUser.password ||
      profile.firstName !== mockUser.profile.firstName ||
      profile.lastName !== mockUser.profile.lastName ||
      profile.age !== mockUser.profile.age
    )
      throw new Error("Not the same guy");

    res.json(jwt.sign(req.body, secret));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  // TODO: CREATE AND SEND BACK TOKEN
});

router.get("/profile", (req, res) => {
  let token = req.headers.authorization;
  token = token.replace("Bearer: ", ""); // Change with something more meaninful

  try {
    res.json({ verify: jwt.verify(token, secret) });
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
