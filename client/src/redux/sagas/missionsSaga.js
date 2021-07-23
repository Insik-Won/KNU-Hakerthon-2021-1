import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
	MISSIONSET_LOAD_FAILURE,
	MISSIONSET_LOAD_REQUEST,
	MISSIONSET_LOAD_SUCCESS,
} from "../types";

const loadMissionSetsAPI = (data) => {
	return axios.get("api/missions");
};

function* loadMissionSets(action) {
	try {
		const result = yield call(loadMissionSetsAPI, action.payload);
		console.log(result);
		yield put({
			type: MISSIONSET_LOAD_SUCCESS,
			payload: result.data,
		});
	} catch (e) {
		yield put({
			type: MISSIONSET_LOAD_FAILURE,
			payload: e.response.data,
		});
	}
}

function* watchLoadMissionSets() {
	yield takeEvery(MISSIONSET_LOAD_REQUEST, loadMissionSets);
}

export default function* missionsSaga() {
	yield all([fork(watchLoadMissionSets)]);
}
