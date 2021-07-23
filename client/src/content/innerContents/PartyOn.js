import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Col, Popover, PopoverBody, PopoverHeader, Row } from "reactstrap";
import {
	CurrentStatus,
	MissionHistory,
	MissionOverview,
	MissionRanking,
} from "../../components/Mission";
import { PARTY_CONNECT_REQUEST } from "../../redux/types";

const PartyOn = () => {
	const { partyId } = useParams();
	const { user } = useSelector((state) => state.auth);
	const { missionSecond, history } = useSelector((state) => state.partyon);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: PARTY_CONNECT_REQUEST,
			payload: { partyId, userId: user.id, dispatch: dispatch },
		});
	}, [dispatch, partyId, user.id]);

	return (
		<div className="party-on-whiteboard">
			<Row>
				<Col md={{ size: 8, order: 2 }}>
					<MissionOverview second={missionSecond} history={history} />
				</Col>
				<Col md={{ size: 2, order: 1 }}></Col>
				<Col md={{ size: 2, order: 3 }}></Col>
			</Row>
		</div>
	);
};

export default PartyOn;
