const express = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
console.log(secret)

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
    console.log(secret);
    const payload = req.body.username;
    const username = req.body.username;
    const password = req.body.password;

    function createToken(payload, secret) {
        const token = jwt.sign(payload, secret);
        return token;
    }

    if (password === mockUser.password && username === mockUser.username) {
        try {
            const token = createToken(payload, secret);
            res.status(201).json({ token: token });
        } catch (err) {
            res.status(400).json({
                error: err.message,
            });
        }
    }
    res.status(401).json({ message: "username or password does not match" });
});



router.get("/profile", (req, res) => {

    function verifyToken(token, secret) {
        try {
            const verifyAToken = jwt.verify(token, secret);
            return verifyAToken;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const tokenWithBearer = req.headers.authorization.split(" ");
    const token = tokenWithBearer[1];

    try {
        const validToken = verifyToken(token, secret);
        res.status(202).json({ user: validToken });
    } catch (err) {
        res.status(401).json({ error: "Authorization failed" });
    }
});

module.exports = router;
