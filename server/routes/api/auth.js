import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
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

// @route   POST api/auth
// @desc    Auth user
// @access  Public

router.post("/", async (req, res) => {
	const { email, password } = req.body;

	// Simple Validation
	if (!email || !password) {
		return res.status(400).json({ msg: "모든 입력란을 채워주세요." });
	}

	//Check for existing user
	const user = await User.findOne({ email });
	if (!user)
		return res
			.status(400)
			.json({ msg: "가입되지 않았거나 잘못된 비밀번호입니다." });

	if (!(await bcrypt.compare(password, user.password))) {
		return res
			.status(400)
			.json({ msg: "가입되지 않았거나 잘못된 비밀번호입니다." });
	}

	const token = await signAsync({ id: user._id }, JWT_SECRET, {
		expiresIn: "1 days",
	});

	res.json({
		token,
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			img: user.img,
			description: user.description,
		},
	});
});

// @route   POST api/auth/logout
// @desc    Auth user
// @access  Public

router.post("/logout", (req, res) => {
	res.json("로그아웃 성공");
});

// @route   GET api/auth/user
// @desc    get Authenticated user
// @access  Public

router.get("/user", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) throw Error("유저가 존재하지 않습니다.");
		console.log(user);
		res.json({
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				img: user.img,
				description: user.description,
			},
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({ msg: e.msg });
	}
});

export default router;
