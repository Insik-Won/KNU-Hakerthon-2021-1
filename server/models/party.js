import mongoose from "mongoose";

const PartySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
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
	},
	endedAt: {
		type: Date,
	},
	whoWin: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "user",
	},
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
				defaults: false,
			},
			agree: {
				type: Number,
				defaults: 0,
			},
			comfirmImg: {
				type: String,
			},
			amplifiedBy: {
				type: Number,
				defaults: 1,
			},
		},
	],
	createdAt: {
		type: Date,
		defaults: Date.now,
	},
});

const Party = mongoose.model("party", PartySchema);

export default Party;
