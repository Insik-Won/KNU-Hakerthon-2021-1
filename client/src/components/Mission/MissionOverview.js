import React from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import MissionHistory from "./MissionHistory";

const MissionOverview = ({ second, history }) => {
	const { user } = useSelector((state) => state.auth);
	const { party } = useSelector((state) => state.party);
	let { unreceivedMissions, receivedMissions, votingMissions, partyClient } =
		useSelector((state) => state.partyon);

	unreceivedMissions = unreceivedMissions || [];
	receivedMissions = receivedMissions || [];

	const myUnreceivedMissions = unreceivedMissions
		.filter((pair) => pair.user === user.id)
		.map((pair) => pair.mission);

	const myReceivedMissions = receivedMissions
		.filter((pair) => pair.user === user.id)
		.map((pair) => pair.mission);

	const onYes = () => {
		partyClient.send({
			type: "MISSION_ACCEPTED",
			payload: {
				partyId: party._id,
				userId: user.id,
				mission: myUnreceivedMissions[0],
			},
		});
	};

	const onNo = () => {
		partyClient.send({
			type: "MISSION_DENIED",
			payload: {
				partyId: party._id,
				userId: user.id,
				mission: myUnreceivedMissions[0],
			},
		});
	};

	const onRequestVote = () => {
		partyClient.send({
			type: "MISSION_VOTE_REQUEST",
			payload: {
				partyId: party._id,
				userId: user.id,
				mission: myReceivedMissions[0],
			},
		});
	};

	const onUploadPhoto = () => {
		alert("아직 구현되지 않았습니다.");
	};

	const upvote = () => {
		partyClient.send({
			type: "MISSION_UPVOTE",
			payload: {
				partyId: party._id,
				userId: user.id,
				mission: votingMissions[0],
			},
		});
	};

	const downvote = () => {
		partyClient.send({
			type: "MISSION_DOWNVOTE",
			payload: {
				partyId: party._id,
				userId: user.id,
				mission: votingMissions[0],
			},
		});
	};

	console.log(receivedMissions);

	return (
		<Container>
			<Row className="shadow-sm py-2">
				<Col>
					<Spinner />
					<div className="mt-2 ml-2 mb-3">
						{second > 0 ? `다음 미션까지 ${second}초 남음...` : ""}
					</div>
				</Col>
			</Row>
			{myUnreceivedMissions.length !== 0 && (
				<Row className="shadow-sm py-2">
					<Col>
						<div className="mt-3 ml-3 mb-2">
							{myUnreceivedMissions[0].name} 미션을 수락하시겠습니까? (
							{myUnreceivedMissions[0].score}점)
						</div>
					</Col>
					<Col>
						<Button className="mt-3 ml-2 float-right" onClick={onNo}>
							거절
						</Button>
						<Button className="mt-3 ml-2 float-right" onClick={onYes}>
							수락
						</Button>
					</Col>
				</Row>
			)}
			{myReceivedMissions.length !== 0 && (
				<Row className="shadow-sm py-2">
					<Col>
						<div className="mt-3 ml-3 mb-2">
							{myReceivedMissions[0].name} 미션을 수행하기 (
							{myReceivedMissions[0].score}점)
						</div>
					</Col>
					<Col>
						<Button className="mt-3 ml-2 float-right" onClick={onRequestVote}>
							인증 요청
						</Button>
						<Button className="mt-3 ml-2 float-right" onClick={onUploadPhoto}>
							사진 올리기(미구현)
						</Button>
					</Col>
				</Row>
			)}
			{{ votingMissions }.length !== 0 && (
				<Row className="shadow-sm py-2">
					<Col>
						<div className="mt-3 ml-3 mb-2">
							{votingMissions[0].user.name}이 수행한 미션 투표하기
						</div>
					</Col>
					<Col>
						<Button className="mt-3 ml-2 float-right" onClick={downvote}>
							에바
						</Button>
						<Button className="mt-3 ml-2 float-right" onClick={upvote}>
							인정
						</Button>
					</Col>
				</Row>
			)}
			{history.map((action, idx) => (
				<MissionHistory key={idx} action={action} />
			))}
		</Container>
	);
};

export default MissionOverview;
