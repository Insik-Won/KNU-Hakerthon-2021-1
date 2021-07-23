import WebSocket from "ws";
import { Random } from "random-js";

import Party from "./models/party";

class PartyApp {
	partyPools = {};

	init(server) {
		this.wss = new WebSocket.Server({ server });

		this.wss.on("connection", (ws) => {
			ws.on("message", (message) => this.onMessage(message, ws));
			ws.on("close", () => this.onClose(ws));
			ws.on("error", (e) => this.onError(e, ws));
		});
	}

	onMessage(message, ws) {
		console.log(message);
		const data = JSON.parse(message);
		console.log("socket data: ", data);

		switch (data.type) {
			case "REGISTER":
				this.onRegister(data, ws);
				break;
			default:
				const partyPool = this.partyPools[data.payload.partyId];
				partyPool.onMessage(data);
				break;
		}
	}

	async onRegister({ partyId, userId }, ws) {
		if (!(partyId in this.partyPools)) {
			this.partyPools[partyId] = new PartyPool(partyId);
		}

		const partyPool = this.partyPools[partyId];

		partyPool.add(ws, userId);
	}

	onClose(ws) {
		ws.partyPool.remove(ws);
	}

	onError(e, ws) {
		console.log(e);
		this.onClose(ws);
	}
}

class Timer {
	second = 0;
	timerId = null;
	interval = null;
	secondCallback = null;
	intervalCallback = null;

	constructor(interval, secondCallback, intervalCallback) {
		this.interval = interval;
		this.second = interval + 1;
		this.secondCallback = secondCallback;
		this.intervalCallback = intervalCallback;
	}

	start() {
		const id = setInterval(() => {
			this.second--;
			this.secondCallback(this.second);
			if (this.second <= 0) {
				this.second = this.interval + 1;
				this.intervalCallback();
			}
		}, 1000);
		this.timerId = id;
	}

	stop() {
		clearInterval(this.timerId);
		this.timerId = null;
		this.secondCallback = null;
		this.intervalCallback = null;
	}
}

class PartyPool {
	sockets = [];
	users = [];
	partyId = "";
	totalNum = 0;
	missions = [];
	missionHistory = [];
	missionTimer = null;
	started = false;

	constructor(partyId) {
		this.partyId = partyId;
		Party.findById(partyId)
			.populate({ path: "missionSets", populate: { path: "missions" } })
			.then((party) => {
				this.totalNum = party.participants.length;

				if (!party.missionSets) return;
				this.missions = party.missionSets.flatMap((e) => e.missions);
			});
	}

	add(socket, userId) {
		console.log("add!");
		if (this.sockets.indexOf(socket) < 0) this.sockets.push(socket);

		if (this.users.indexOf(userId) < 0) this.users.push(userId);

		socket.partyPool = this;
		socket.user = userId;

		if (this.started) return;

		if (this.users.length >= this.totalNum * 0.8) {
			this.startMissionTimer();
		}
	}

	broadcast(data) {
		for (const socket of this.sockets || []) {
			socket.send(JSON.stringify(data));
		}
	}

	findSocket(userId) {
		const idx = sockets.findIndex((socket) => userId === socket.userId);
		if (idx >= 0) return sockets[idx];
		else return null;
	}

	remove(socket) {
		const idx = this.sockets.indexOf(socket);
		if (idx >= 0) {
			this.sockets.splice(idx);
		}

		const userIdx = this.users.indexOf(socket.user);
		if (userIdx >= 0) {
			this.users.splice(userIdx);
		}

		socket.partyPool = null;
		socket.user = null;
	}

	startMissionTimer() {
		this.missionTimer = new Timer(
			5,
			(sec) => this.secondMission(sec),
			() => this.submitMission()
		);
		this.missionTimer.start();
		this.started = true;
	}

	secondMission(sec) {
		this.broadcast({ type: "MISSION_SECOND", payload: sec });
	}

	submitMission() {
		const rand = new Random();
		if (this.missions.length <= 0 || this.users.length <= 0) return;

		const mission = rand.pick(this.missions);
		const user = rand.pick(this.users);
		for (const socket of this.sockets) {
			socket.send(
				JSON.stringify({ type: "MISSION_SUBMIT", payload: { user, mission } })
			);
		}

		this.missionHistory.push({ mission, user });

		this.missionTimer.stop();
	}

	voteMission() {}

	onMessage(data) {
		switch (data.type) {
			case "MISSION_ACCEPTED":
				this.broadcast(data);
				break;
			case "MISSION_DENIED":
				this.broadcast(data);
				this.startMissionTimer();
				break;
			case "MISSION_VOTE_REQUEST":
				this.broadcast(data);
				break;
			case "MISSION_UPVOTE":
				this.voteMission(data.mission.mission, data.mission.user._id);
				break;
			case "MISSION_DOWNVOTE":
				this.broadcast(data);
				break;
			default:
				console.log("default");
				break;
		}
	}
}

const partyApp = new PartyApp();

export default partyApp;
