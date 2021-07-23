import {
	MISSIONSET_ERROR_CLEAR_REQUEST,
	MISSIONSET_LOAD_FAILURE,
	MISSIONSET_LOAD_REQUEST,
	MISSIONSET_LOAD_SUCCESS,
} from "../types";

const initialState = {
	isLoading: false,
	missionSets: [],
	errorMsg: "",
};

const missionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case MISSIONSET_LOAD_REQUEST:
			return {
				...state,
				isLoading: true,
				missionSets: [],
				errorMsg: "",
			};
		case MISSIONSET_LOAD_SUCCESS:
			console.log(action);
			return {
				...state,
				missionSets: action.payload.missionSets,
				isLoading: false,
				errorMsg: "",
			};
		case MISSIONSET_LOAD_FAILURE:
			console.log(action);
			return {
				...state,
				isLoading: false,
				missionSets: [],
				errorMsg: action.payload.msg,
			};
		case MISSIONSET_ERROR_CLEAR_REQUEST:
			return {
				...state,
				errorMsg: "",
			};
		default:
			return state;
	}
};

export default missionsReducer;
