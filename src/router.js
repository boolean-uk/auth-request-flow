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

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Both username and password are required" });
  }
  if (isValidCredentials(username, password)) {
    const payload = { username };
    try {
      const token = jwt.sign(payload, secret);

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({ error: "Error has occurred" });
    }
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});
function isValidCredentials(username, password) {
  return username === mockUser.username && password === mockUser.password;
}

router.get("/profile", (req, res) => {
  const tokenHead = req.headers.authorization;
  console.log(tokenHead);

  const [, token] = tokenHead.split(" ");
  console.log(token);

  jwt.verify(token, secret, (error) => {
    if (error) {
      return res
        .status(401)
        .json({ error: "Unauthorized ascess Invalid token" });
    }

    return res.json({ profile: mockUser.profile });
  });
});

module.exports = router;
