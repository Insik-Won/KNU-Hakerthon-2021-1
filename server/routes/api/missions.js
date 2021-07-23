import express from "express";

// Models
import MissionSet from "../../models/missionSet";
import Mission from "../../models/mission";

const router = express.Router();

// @routes  Get api/missions
// @desc    Get all missionSet
// @access  public

router.get("/", async (req, res) => {
	try {
		const missionSets = await MissionSet.find().populate("missions");
		res.status(200).json({ missionSets });
	} catch (e) {
		console.log(e);
		res.status(400).json({ msg: e.msg });
	}
});

export default router;
