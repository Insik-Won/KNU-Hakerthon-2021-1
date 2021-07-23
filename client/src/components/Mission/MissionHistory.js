import React from "react";
import { useSelector } from "react-redux";
import { Row } from "reactstrap";
import {
	MISSION_ACCEPTED,
	MISSION_DENIED,
	MISSION_SECOND,
	MISSION_SUBMIT,
	MISSION_VOTE_REQUEST,
} from "../../redux/types";

const MissionHistory = ({ action }) => {
	const { party } = useSelector((state) => state.party);

	const userDictionary = {};
	for (const user of (party && party.participants) || []) {
		userDictionary[user._id] = user.name;
	}

	if (!action) return null;

	const payload = action.payload;

	switch (action.type) {
		case MISSION_SUBMIT:
			return (
				<Row className="shadow-sm my-3 p-2">
					<div>{`${userDictionary[payload.user]} 멤버가 ${
						payload.mission.name
					} 미션을 받음!`}</div>
				</Row>
			);
		case MISSION_ACCEPTED:
			return (
				<Row className="shadow-sm my-3 p-2">
					<div>{`${userDictionary[payload.userId]} 멤버가 ${
						payload.mission.name
					} 미션을 수락함!`}</div>
				</Row>
			);
		case MISSION_DENIED:
			return (
				<Row className="shadow-sm my-3 p-2">
					<div>{`${userDictionary[payload.userId]} 멤버가 ${
						payload.mission.name
					} 미션을 거절함!`}</div>
				</Row>
			);
		case MISSION_VOTE_REQUEST:
			return (
				<Row className="shadow-sm my-3 p-2">
					<div>{`${userDictionary[payload.userId]} 멤버가 ${
						payload.mission.name
					} 미션 인증을 요청함!`}</div>
				</Row>
			);
		default:
			return null;
	}
};

export default MissionHistory;
