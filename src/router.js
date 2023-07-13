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
  const token = jwt.sign({ payload: mockUser.username }, secret);
  res.status(201).json({ token });
});

// 1. Get the token from the `authorization` header of the request.
//     - Use console logs to inspect the `req` object to figure out how to find this.
// 2. Use the `jsonwebtoken` library to verify that the token is valid.
// 3. Respond with the mock user's profile if the token is valid, or a failure message if it isn't.

router.get("/profile", (req, res) => {
  //   const token = req.headers["authorization"];
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYXV0aGd1eSIsImlhdCI6MTY4OTI1MDE0MX0._ujptOpYI3dFuC6dJKNvYthpb-DP14klsbLJCA8K0es
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(token, secret);
    res.json({mockUser});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
