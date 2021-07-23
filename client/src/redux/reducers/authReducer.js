import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	CLEAR_ERROR_REQUEST,
	CLEAR_ERROR_SUCCESS,
	CLEAR_ERROR_FAILURE,
	USER_LOADING_REQUEST,
	USER_LOADING_SUCCESS,
	USER_LOADING_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	PASSWORD_EDIT_FAILURE,
	PASSWORD_EDIT_REQUEST,
	PASSWORD_EDIT_SUCCESS,
} from "../types";

const inititalState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	isLoading: false,
	user: "",
	errorMsg: "",
	successMsg: "",
	previousMatchMsg: "",
};

const authReducer = (state = inititalState, action) => {
	switch (action.type) {
		case REGISTER_REQUEST:
		case LOGIN_REQUEST:
		case LOGOUT_REQUEST:
			return {
				...state,
				errorMsg: "",
				isLoading: true,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload.user,
				errorMsg: "",
			};
		case LOGOUT_SUCCESS:
			localStorage.removeItem("token");
			return {
				toekn: null,
				user: null,
				isAuthenticated: false,
				isLoading: false,
				errorMsg: "",
			};
		case REGISTER_FAILURE:
		case LOGIN_FAILURE:
		case LOGOUT_FAILURE:
			localStorage.removeItem("token");
			return {
				...state,
				...action.payload,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false,
				errorMsg: action.payload.msg,
			};
		case USER_LOADING_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case USER_LOADING_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload.user,
			};
		case USER_LOADING_FAILURE:
			return {
				...state,
				user: null,
				userId: "",
				userName: "",
				isAuthenticated: false,
				isLoading: false,
			};

		case PASSWORD_EDIT_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case PASSWORD_EDIT_SUCCESS:
			return {
				...state,
				isLoading: false,
				successMsg: action.payload.msg,
				errorMsg: "",
				previousMatchMsg: "",
			};
		case PASSWORD_EDIT_FAILURE:
			return {
				...state,
				isLoading: false,
				successMsg: "",
				errorMsg: action.payload.msg,
				previousMatchMsg: action.payload.match_msg,
			};
		case CLEAR_ERROR_REQUEST:
			return {
				...state,
			};
		case CLEAR_ERROR_SUCCESS:
			return {
				...state,
				errorMsg: "",
				previousMatchMsg: "",
			};
		case CLEAR_ERROR_FAILURE:
			return {
				...state,
				errorMsg: "clear error fail",
				previousMatchMsg: "clear error fail",
			};
		default:
			return state;
	}
};

export default authReducer;
