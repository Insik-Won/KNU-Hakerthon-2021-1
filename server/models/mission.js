import mongoose from "mongoose";

const MissionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
	contents: {
		type: String,
	},
	missionSet: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "missionSet",
		required: true,
	},
});

const Mission = mongoose.model("mission", MissionSchema);

export default Mission;
