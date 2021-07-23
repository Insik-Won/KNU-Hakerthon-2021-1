import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import PartyClient from "../Helpers/partyClient";
import {
	PARTY_CONNECT_FAILURE,
	PARTY_CONNECT_REQUEST,
	PARTY_CONNECT_SUCCESS,
	PARTY_START_FAILURE,
	PARTY_START_REQUEST,
	PARTY_START_SUCCESS,
} from "../types";

// Start Party

const startPartyAPI = (payload) => {
	return axios.post(`api/party/start`, payload);
};

function* startParty(action) {
	try {
		const result = yield call(startPartyAPI, action.payload);
		console.log("start party:", result);
		yield put({
			type: PARTY_START_SUCCESS,
			payload: result.data,
		});

		yield put(push(`/party/on/${result.data.id}`));
	} catch (e) {
		console.log(e);
		yield put({
			type: PARTY_START_FAILURE,
			payload: e.response && e.response.data,
		});
	}
}

function* watchStartParty() {
	yield takeEvery(PARTY_START_REQUEST, startParty);
}

// Connect to Party

const connectToPartyAPI = (payload) => {
	console.log(payload);
	return new PartyClient(
		"ws://localhost:7000",
		payload.partyId,
		payload.userId,
		payload.dispatch
	);
};

function* connectToParty(action) {
	try {
		const result = yield call(connectToPartyAPI, action.payload);
		console.log("connect to party:", result);
		yield put({
			type: PARTY_CONNECT_SUCCESS,
			payload: { partyClient: result },
		});
	} catch (e) {
		console.log(e);
		yield put({
			type: PARTY_CONNECT_FAILURE,
			payload: e,
		});
	}
}

function* watchcConnectToParty() {
	yield takeEvery(PARTY_CONNECT_REQUEST, connectToParty);
}

export default function* partyonSaga() {
	yield all([fork(watchStartParty), fork(watchcConnectToParty)]);
}
