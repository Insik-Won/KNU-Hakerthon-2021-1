import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import missionsReducer from "./missionsReducer";
import partyReducer from "./partyReducer";
import partyonReducer from "./partyonReducer";

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		auth: authReducer,
		missions: missionsReducer,
		party: partyReducer,
		partyon: partyonReducer,
	});

export default createRootReducer;
