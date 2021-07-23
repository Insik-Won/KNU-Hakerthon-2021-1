import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { MONGO_URI, isProduction } from "./config";

// Routes
import userRoute from "./routes/api/user";
import authRoute from "./routes/api/auth";
import partyRoute from "./routes/api/party";
import partyonRoute from "./routes/api/partyon";
import missionsRoute from "./routes/api/missions";

const app = express();

app.use(hpp());
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/party", partyRoute);
app.use("/api/party", partyonRoute);
app.use("/api/missions", missionsRoute);

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB connecting Success!"))
	.catch((e) => {
		console.log("MongoDB connect failure:\n", e);
	});

if (isProduction) {
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
	});
}

export default app;
