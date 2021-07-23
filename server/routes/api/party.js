import express from "express";
import auth from "../../middleware/auth";
import createUpload from "../../middleware/upload";

// Models
import Party from "../../models/party";
// Middleware
const prizeImageUpload = createUpload("partyPrizeImages");

const router = express.Router();

// @routes  GET api/party/:id
// @desc    Get a party
// @access  public
router.get("/:id", async (req, res) => {
	try {
		const party = await Party.findById(req.params.id).populate({
			path: "participants",
			select: "name id",
		});

		res.json({ party });
	} catch (e) {
		console.log(e);
		res.status(400).json({ msg: e.response && e.response.data });
	}
});

// @routes  POST api/party
// @desc    Create a party
// @access  public

router.post(
	"/",
	auth,
	prizeImageUpload.single("prizeImage"),
	async (req, res) => {
		console.log(req.body);

		const { name, prizeDescription, host, missionSets } = req.body;

		if (!name) {
			res.status(400).json({ msg: "이름을 적어주세요" });
		}

		const prizeImage = (req.file && req.file.location) || undefined;

		const newParty = await Party.create({
			name,
			host,
			participants: [host],
			prizeImage,
			prizeDescription,
			missionSets: (missionSets && missionSets.split(",")) || null,
		});

		res.json({ party: newParty });
	}
);

// @routes  POST api/party/judge
// @desc    change judge
// @access  private

router.post("/judge", auth, async (req, res) => {
	try {
		const { id, partyId } = req.body;
		const party = await Party.findById(partyId);

		if (req.user.id === party.host.toString()) {
			party.judge = id;
			await party.save();

			res.status(200).json({ id: partyId });
		} else {
			res
				.status(400)
				.json({ msg: "임명 실패: 요청한 이가 주최자가 아닙니다." });
		}
	} catch (e) {
		console.log(e);
		res.status(400).json({ msg: "임명 실패: 서버 오류" });
	}
});

// @routes  POST api/party/user/delete
// @desc    exile a user
// @access  private

router.post("/user/delete", auth, async (req, res) => {
	try {
		const { id, partyId } = req.body;
		const party = await Party.findById(partyId);

		if (req.user.id === party.host.toString() || req.user.id === id) {
			if (id === party.judge) {
				party.judge = null;
			}
			const idx = party.participants.indexOf(id);
			party.participants.splice(idx);
			await party.save();

			res.status(200).json({ id: partyId });
		} else {
			res.status(400).json({ msg: "권한이 없습니다." });
		}
	} catch (e) {
		console.log(e);
		res.status(400).json({ msg: "서버 오류가 일어났습니다." });
	}
});

// @routes  POST api/party/user/participate
// @desc    participate a party
// @access  private

router.post("/user/participate", auth, async (req, res) => {
	const userId = req.user.id;
	const partyId = req.body.partyId;

	let party = null;
	try {
		party = await Party.findById(partyId);
	} catch (e) {
		console.log(e);
		res
			.status(400)
			.json({ msg: "해당 파티 코드는 생성되지 않은 파티코드입니다." });
	}

	try {
		if (party.participants.indexOf(userId) > 0) {
			res.status(200).json({ id: partyId });
		}
		party.participants.push(userId);
		await party.save();

		res.status(200).json({ id: partyId });
	} catch (e) {
		console.log(e);
		res.status(400).json({ msg: "서버 오류로 참가에 실패하였습니다." });
	}
});

// @routes  GET api/party/started/:id
// @desc    check party is started
// @access  public
router.get("/started/:id", async (req, res) => {
	const partyId = req.params.id;

	try {
		const party = await Party.findById(partyId);
		res.status(200).json({ startedAt: party.startedAt });
	} catch (e) {
		console.log(e);
		re.status(400).json({ msg: "서버 오류" });
	}
});

export default router;
