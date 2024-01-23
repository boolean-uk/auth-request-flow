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
    console.log(secret)
    const payload = req.headers.payload;

    function createToken(payload, secret) {
        const token = jwt.sign(payload, secret);
        return token;
    }

    try {
        const token = createToken(payload, secret);
        res.status(201).json({ token: token });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

router.get("/profile", (req, res) => {});

module.exports = router;
