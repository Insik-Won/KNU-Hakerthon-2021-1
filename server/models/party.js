import mongoose from "mongoose";

const PartySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	host: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "user",
	},
	judge: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "user",
	},
	participants: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "user",
		},
	],
	startedAt: {
		type: Date,
		default: new Date(0),
	},
	endedAt: {
		type: Date,
		default: new Date(0),
	},
	whoWin: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "user",
	},
	missionSets: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "missionSet",
		},
	],
	missions: [
		{
			mission: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: "mission",
			},
			ownBy: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: "user",
			},
			isWon: {
				type: Boolean,
				default: false,
			},
			agree: {
				type: Number,
				default: 0,
			},
			confirmFile: {
				type: String,
				default: "",
			},
			amplifiedBy: {
				type: Number,
				default: 1,
			},
		},
	],
	prizeImage: {
		type: String,
		default: "",
	},
	prizeDescription: {
		type: String,
		default: "",
	},
	createdAt: {
		type: Date,
		defaults: Date.now,
	},
});

const Party = mongoose.model("party", PartySchema);

Party.deleteMany().then(() => console.log("party deleted"));

export default Party;
