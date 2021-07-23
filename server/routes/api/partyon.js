import express from "express";
import { createPool, getPool, deletePool } from "../../partyApp";

// Models
import Party from "../../models/party";

const router = express.Router();

// @routes  POST api/party/start
// @desc    Start a Party
// @access  private

router.post("/start", async (req, res) => {
	const { partyId } = req.body;

	const party = await Party.findById(partyId);

	party.startedAt = new Date();
	await party.save();

	res.status(200).json({ id: partyId });
});

// @routes  POST api/party/end
// @desc    End a Party
// @access  private

router.post("/end", async (req, res) => {
	const { partyId } = req.body;

	const party = await Party.findById(partyId);

	party.endedAt = new Date();
	await party.save();

	res.status(200).json({ id: partyId });
});

export default router;
