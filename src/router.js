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
router.post("/login", async (req, res) => {
  const { loginUsername, loginPassword } = req.body;
  const user = mockUser.find((u) => u.username === loginUsername);
  if (user && (await bcrypt.compare(loginPassword, user.password))) {
    const token = jwt.sign(
      { username: user.username, profile: user.profile },
      secretKey
    );
    return res.status(200).send({ token });
  }
  return res.status(401).send({
    error: "Your username or password is incorrect. Please try again.",
  });
});

router.get("/profile", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { username } = jwt.verify(token, secretKey);
  const user = mockUser.find((u) => u.username === username);
  if (user) {
    return res.status(200).send({
      username: user.username,
      profile: user.profile,
    });
  }
  return res.status(401).send({
    error: "You are not authorized to view this profile.",
  });
});

module.exports = router;
