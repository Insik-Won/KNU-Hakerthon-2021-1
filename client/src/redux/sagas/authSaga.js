import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	REGISTER_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	USER_LOADING_FAILURE,
	USER_LOADING_REQUEST,
	USER_LOADING_SUCCESS,
	CLEAR_ERROR_REQUEST,
	CLEAR_ERROR_SUCCESS,
	CLEAR_ERROR_FAILURE,
	PASSWORD_EDIT_SUCCESS,
	PASSWORD_EDIT_FAILURE,
	PASSWORD_EDIT_REQUEST,
} from "../types";

// Login

const loginUserAPI = (data) => {
	console.log(data, "data");
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	return axios.post("api/auth", data, config);
};

function* loginUser(action) {
	try {
		const result = yield call(loginUserAPI, action.payload);
		console.log(result);
		yield put({
			type: LOGIN_SUCCESS,
			payload: result.data,
		});
	} catch (e) {
		yield put({
			type: LOGIN_FAILURE,
			payload: e.response.data,
		});
	}
}

function* watchLoginUser() {
	yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT

function* logout() {
	try {
		yield put({
			type: LOGOUT_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: LOGIN_FAILURE,
			payload: e.response.data,
		});
		console.log(e);
	}
}

function* watchLogout() {
	yield takeEvery(LOGOUT_REQUEST, logout);
}

// User Loading

const userLoadingAPI = (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	if (token) {
		config.headers["x-auth-token"] = token;
	}

	return axios.get("api/auth/user", config);
};

function* userLoading(action) {
	try {
		console.log("userLoading:", action);
		const result = yield call(userLoadingAPI, action.payload);
		console.log("result:", result);
		yield put({
			type: USER_LOADING_SUCCESS,
			payload: result.data,
		});
	} catch (e) {
		yield put({
			type: USER_LOADING_FAILURE,
			payload: e.response.data,
		});
	}
}

function* watchUserLoading() {
	yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// Register

const registerUserAPI = (data) => {
	console.log("data:", data);
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};

	return axios.post("api/user", data, config);
};

function* registerUser(action) {
	try {
		const result = yield call(registerUserAPI, action.payload);
		console.log("RegisterUser Data:", result);
		yield put({
			type: REGISTER_SUCCESS,
			payload: result.data,
		});
	} catch (e) {
		yield put({
			type: REGISTER_FAILURE,
			payload: e.response && e.response.data,
		});
	}
}

function* watchRegisterUser() {
	yield takeEvery(REGISTER_REQUEST, registerUser);
}

// Edit Password

const editPasswordAPI = (payload) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	if (payload.token) {
		config.headers["x-auth-token"] = payload.token;
	}

	console.log("config:", config);

	return axios.post(`api/user/${payload.userName}/profile`, payload, config);
};

function* editPassword(action) {
	try {
		console.log("editPassword:", action);
		const result = yield call(editPasswordAPI, action.payload);
		console.log(result);
		yield put({
			type: PASSWORD_EDIT_SUCCESS,
			payload: result.data,
		});
	} catch (e) {
		console.log(e.response);
		yield put({
			type: PASSWORD_EDIT_FAILURE,
			payload: e.response.data,
		});
	}
}

function* watcheEditPassword() {
	yield takeEvery(PASSWORD_EDIT_REQUEST, editPassword);
}

// clear Error

function* clearError() {
	try {
		yield put({
			type: CLEAR_ERROR_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: CLEAR_ERROR_FAILURE,
			payload: e.response.data,
		});
	}
}

function* watchClearError() {
	yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

export default function* authSaga() {
	yield all([
		fork(watchLoginUser),
		fork(watchLogout),
		fork(watchUserLoading),
		fork(watchRegisterUser),
		fork(watcheEditPassword),
		fork(watchClearError),
	]);
}
