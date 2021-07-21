import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

// Helper Function
const signAsync = (payload, secretOrPrivateKey, option) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secretOrPrivateKey, option, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

// Model
import User from "../../models/user";

const router = express.Router();

// @routes  GET api/user
// @desc    Get all users
// @access  public

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (e) {
		console.log(e);
		res.status(400).json({ msg: e.msg });
	}
});

// @routes  Post api/user
// @desc    Register a user
// @access  public

router.post("/", async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ msg: "모든 필드를 채워주세요." });
	}
	if (await User.findOne({ email })) {
		return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다." });
	}

	// encrypt password
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hash,
	});

	const token = await signAsync({ id: newUser.id }, JWT_SECRET, {
		expiresIn: "12 hours",
	});

	res.json({
		token,
		user: {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
		},
	});
});

export default router;
