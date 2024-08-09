const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
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

	if (username !== mockUser.username || password !== mockUser.password) {
		return res.status(401).json({ message: "wrong credentials" });
	}

	return res.status(200).json({
		token: jwt.sign({ username: mockUser.username }, SECRET),
	});
});

router.get("/profile", (req, res) => {
	try {
		if (jwt.verify(req.headers.authorization, SECRET)) {
			return res.status(200).json({ profile: mockUser.profile });
		}
	} catch (error) {}

	res.status(401).json({ message: "invalid or missing token" });
});

module.exports = router;
