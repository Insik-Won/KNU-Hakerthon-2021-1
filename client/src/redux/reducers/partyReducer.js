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
	PARTY_ERROR_CLEAR_REQUEST,
	PARTY_IS_STARTED_FAILURE,
	PARTY_IS_STARTED_REQUEST,
	PARTY_IS_STARTED_SUCCESS,
	PARTY_LOAD_FAILURE,
	PARTY_LOAD_REQUEST,
	PARTY_LOAD_SUCCESS,
} from "../types";

const initialState = {
	isLoading: false,
	party: null,
	isStarted: false,
	isEnded: false,
	errorMsg: "",
};

const partyReducer = (state = initialState, action) => {
	switch (action.type) {
		case PARTY_CREATE_REQUEST:
		case PARTY_LOAD_REQUEST:
			return {
				...state,
				isLoading: true,
				party: null,
				errorMsg: "",
			};
		case PARTY_CREATE_SUCCESS:
		case PARTY_LOAD_SUCCESS:
			return {
				...state,
				isLoading: false,
				party: action.payload.party,
				errorMsg: "",
			};
		case PARTY_CREATE_FAILURE:
		case PARTY_LOAD_FAILURE:
			return {
				...state,
				isLoading: false,
				party: null,
				errorMsg: action.payload.msg,
			};
		case PARTY_ERROR_CLEAR_REQUEST:
			return {
				...state,
				errorMsg: "",
			};
		case PARTICIPATE_REQUEST:
		case CHANGE_JUDGE_REQUEST:
		case EXILE_REQUEST:
			return {
				...state,
				isLoading: true,
				errorMsg: "",
			};
		case PARTICIPATE_SUCCESS:
		case CHANGE_JUDGE_SUCCESS:
		case EXILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				errorMsg: "",
			};
		case PARTICIPATE_FAILURE:
		case CHANGE_JUDGE_FAILURE:
		case EXILE_FAILURE:
			return {
				...state,
				isLoading: false,
				errorMsg: action.payload.msg,
			};
		case PARTY_IS_STARTED_REQUEST:
		case PARTY_IS_STARTED_FAILURE:
			return state;
		case PARTY_IS_STARTED_SUCCESS:
			return {
				...state,
				isStarted: Date.parse(action.payload.startedAt) > 0,
			};
		default:
			return state;
	}
};

export default partyReducer;
