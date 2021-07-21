import mongoose from "mongoose";

const MissionSetSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	creator: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	missions: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "mission",
		},
	],
});

const MissionSet = mongoose.Model("missionSet", MissionSetSchema);

export default MissionSet;
