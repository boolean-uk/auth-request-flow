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
	res.json(jwt.sign(req.body, secret));
});

router.get("/profile", (req, res) => {
	const token = req.headers.authorization;

	try {
		const verify = jwt.verify(token, secret);
		console.log(verify);
		return verify;
	} catch (e) {
		res.json({ error: e.message });
	}
});

module.exports = router;
