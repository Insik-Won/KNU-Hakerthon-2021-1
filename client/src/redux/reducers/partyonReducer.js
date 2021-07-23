import { useDispatch } from "react-redux";
import {
	PARTY_START_FAILURE,
	PARTY_START_REQUEST,
	PARTY_START_SUCCESS,
	PARTY_CONNECT_REQUEST,
	PARTY_CONNECT_SUCCESS,
	PARTY_CONNECT_FAILURE,
	TEST_REQUEST,
	MISSION_SECOND,
	MISSION_SUBMIT,
	MISSION_ACCEPTED,
	MISSION_DENIED,
	MISSION_VOTE_REQUEST,
} from "../types";

const initialState = {
	partyId: "",
	isLoading: false,
	partyClient: null,
	errorMsg: "",

	missionSecond: -1,
	unreceivedMissions: [],
	receivedMissions: [],
	votingMissions: [],
	completedMissions: [],
	missions: [],
	history: [],
};

const partyonReducer = (state = initialState, action) => {
	switch (action.type) {
		case PARTY_START_REQUEST:
			return {
				...state,
				isLoading: true,
				partyId: "",
				errorMsg: "",
			};
		case PARTY_START_SUCCESS:
			return {
				...state,
				isLoading: false,
				partyId: action.payload.partyId,
				errorMsg: "",
			};
		case PARTY_START_FAILURE:
			return {
				...state,
				isLoading: false,
				partyId: "",
				errorMsg: action.payload.msg,
			};
		case PARTY_CONNECT_REQUEST:
			return {
				...state,
				partyClient: null,
				errorMsg: "",
			};
		case PARTY_CONNECT_SUCCESS:
			return {
				...state,
				partyClient: action.payload.partyClient,
				errorMsg: "",
				missionSecond: -1,
				unreceivedMissions: [],
				receivedMissions: [],
				votingMissions: [],
				completedMissions: [],
				missions: [],
				history: [],
			};
		case PARTY_CONNECT_FAILURE:
			return {
				...state,
				partyClient: null,
				errorMsg: action.payload.msg,
			};

		case MISSION_SECOND:
			return {
				...state,
				missionSecond: action.payload.second,
			};

		case MISSION_SUBMIT:
			return {
				...state,
				unreceivedMissions: [...state.unreceivedMissions, action.payload],
				history: [action, ...state.history],
			};
		case MISSION_ACCEPTED:
			return {
				...state,
				unreceivedMissions: state.unreceivedMissions.filter(
					(mission) => mission === action.payload.mission
				),
				receivedMissions: [
					state.receivedMissions,
					{ mission: action.payload.mission, user: action.payload.userId },
				],
				history: [action, ...state.history],
			};
		case MISSION_DENIED:
			return {
				...state,
				unreceivedMissions: state.unreceivedMissions.filter(
					(mission) => mission === action.payload.mission
				),
				history: [action, ...state.history],
			};
		case MISSION_VOTE_REQUEST:
			return {
				...state,
				receivedMissions: state.unreceivedMissions.filter(
					(mission) => mission === action.payload.mission
				),
				votingMissions: [
					state.receivedMissions,
					{ mission: action.payload.mission, user: action.payload.userId },
				],
				history: [action, ...state.history],
			};
		case TEST_REQUEST:
			console.log("TEST GOT IT! : ", action.payload);
			return state;
		default:
			return state;
	}
};

export default partyonReducer;
