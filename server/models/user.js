import mongoose from "mongoose";
import { DEFAULT_IMAGE_URL } from "../config";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["MainAdmin", "SubAdmin", "User"],
		default: "User",
	},
	createdAt: {
		type: Date,
		defaults: Date.now,
	},
	img: {
		type: String,
		default: DEFAULT_IMAGE_URL,
	},
	description: {
		type: String,
		defaults: "",
	},
	parties: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "party",
		},
	],
});

const User = mongoose.model("user", UserSchema);

export default User;
