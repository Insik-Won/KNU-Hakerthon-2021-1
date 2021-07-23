import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import { history } from "../../store";
import {
	CHANGE_JUDGE_FAILURE,
	CHANGE_JUDGE_REQUEST,
	CHANGE_JUDGE_SUCCESS,
	EXILE_FAILURE,
	EXILE_REQUEST,
	EXILE_SUCCESS,
	PARTICIPATE_FAILURE,
	PARTICIPATE_REQUEST,
	PARTICIPATE_SUCCESS,
	PARTY_CREATE_FAILURE,
	PARTY_CREATE_REQUEST,
	PARTY_CREATE_SUCCESS,
	PARTY_IS_STARTED_FAILURE,
	PARTY_IS_STARTED_REQUEST,
	PARTY_IS_STARTED_SUCCESS,
	PARTY_LOAD_FAILURE,
	PARTY_LOAD_REQUEST,
	PARTY_LOAD_SUCCESS,
} from "../types";

// Load Party

const loadPartyAPI = (payload) => {
	return axios.get(`api/party/${payload.id}`);
};

function* loadParty(action) {
	try {
		const result = yield call(loadPartyAPI, action.payload);
		console.log("load party:", result);
		yield put({
			type: PARTY_LOAD_SUCCESS,
			payload: result.data,
		});
	} catch (e) {
		console.log(e);
		yield put({
			type: PARTY_LOAD_FAILURE,
			payload: e.response && e.response.data,
		});
	}
}

function* watchLoadParty() {
	yield takeEvery(PARTY_LOAD_REQUEST, loadParty);
}

// Create Party

const createPartyAPI = (payload) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};

	console.log(payload);

	if (payload.token) {
		config.headers["x-auth-token"] = payload.token;
	}

	return axios.post("api/party", payload, config);
};

function* createParty(action) {
	try {
		const result = yield call(createPartyAPI, action.payload);
		console.log(result);
		yield put({
			type: PARTY_CREATE_SUCCESS,
			payload: result.data,
		});

		yield put(push(`/party/waiting/${result.data.party._id}`));
	} catch (e) {
		console.log(e);
		yield put({
			type: PARTY_CREATE_FAILURE,
			payload: e.response && e.response.data,
		});
	}
}

function* watchCreateParty() {
	yield takeEvery(PARTY_CREATE_REQUEST, createParty);
}

// Change Judge

const changeJudgeAPI = (payload) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	console.log(payload);

	if (payload.token) {
		config.headers["x-auth-token"] = payload.token;
	}

	return axios.post("api/party/judge", payload, config);
};

function* changeJudge(action) {
	try {
		const result = yield call(changeJudgeAPI, action.payload);
		console.log(result);
		yield put({
			type: CHANGE_JUDGE_SUCCESS,
			payload: result.data,
		});
		yield put(push(`/party/waiting/${result.data.id}`));
	} catch (e) {
		console.log(e);
		yield put({
			type: CHANGE_JUDGE_FAILURE,
			payload: e.response && e.response.data,
		});
	}
}

function* watchChangeJudge() {
	yield takeEvery(CHANGE_JUDGE_REQUEST, changeJudge);
}

// Exile user

const exileUserAPI = (payload) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	console.log(payload);

	if (payload.token) {
		config.headers["x-auth-token"] = payload.token;
	}

	return axios.post("api/party/user/delete", payload, config);
};

function* exileUser(action) {
	try {
		const result = yield call(exileUserAPI, action.payload);
		console.log(result);
		yield put({
			type: EXILE_SUCCESS,
			payload: result.data,
		});

		if (action.payload.next) {
			window.location.href = action.payload.next;
			return;
		}

		yield put(push(`/party/waiting/${result.data.id}`));
	} catch (e) {
		console.log(e);
		yield put({
			type: EXILE_FAILURE,
			payload: e.response && e.response.data,
		});
	}
}

function* watchExileUser() {
	yield takeEvery(EXILE_REQUEST, exileUser);
}

// Participate a party

const participateAPI = (payload) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	console.log(payload);

	if (payload.token) {
		config.headers["x-auth-token"] = payload.token;
	}

	return axios.post("api/party/user/participate", payload, config);
};

function* participate(action) {
	try {
		const result = yield call(participateAPI, action.payload);
		console.log(result);
		yield put({
			type: PARTICIPATE_SUCCESS,
			payload: result.data,
		});

		yield put(push(`/party/waiting/${result.data.id}`));
		//window.location.href = `/party/waiting/${result.data.id}`;
	} catch (e) {
		console.log(e);
		yield put({
			type: PARTICIPATE_FAILURE,
			payload: e.response && e.response.data,
		});
	}
}

function* watchParticipate() {
	yield takeEvery(PARTICIPATE_REQUEST, participate);
}

// Check a party is started

const checkPartyStartedAPI = (payload) => {
	console.log("payload:", payload);
	return axios.get(`api/party/started/${payload.id}`);
};

function* checkPartyStarted(action) {
	try {
		const result = yield call(checkPartyStartedAPI, action.payload);
		console.log(result);
		yield put({
			type: PARTY_IS_STARTED_SUCCESS,
			payload: { startedAt: result.data.startedAt },
		});
	} catch (e) {
		console.log(e);
		yield put({
			type: PARTY_IS_STARTED_FAILURE,
			payload: e.response && e.response.data,
		});
	}
}

function* watchCheckPartyStarted() {
	yield takeEvery(PARTY_IS_STARTED_REQUEST, checkPartyStarted);
}

export default function* partySaga() {
	yield all([
		fork(watchCreateParty),
		fork(watchLoadParty),
		fork(watchChangeJudge),
		fork(watchExileUser),
		fork(watchParticipate),
		fork(watchCheckPartyStarted),
	]);
}
