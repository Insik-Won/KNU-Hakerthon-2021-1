import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Alert, Badge, Button, Col, Row, Spinner } from "reactstrap";
import Selector from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faJournalWhills } from "@fortawesome/free-solid-svg-icons";
import {
	CHANGE_JUDGE_REQUEST,
	EXILE_REQUEST,
	PARTY_LOAD_REQUEST,
	PARTY_IS_STARTED_REQUEST,
	PARTY_START_REQUEST,
} from "../../redux/types";
import { push } from "connected-react-router";

const WaitingRoom = () => {
	const { partyId } = useParams();
	const [localMsg, setLocalMsg] = useState("");
	const [selectedUserId, setSelectedUserId] = useState(null);
	const dispatch = useDispatch();
	const { party, isLoading, errorMsg, isStarted } = useSelector(
		(state) => state.party
	);
	const { isLoading: isStarting } = useSelector((state) => state.partyon);
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	useEffect(() => {
		const timer = setInterval(() => {
			dispatch({
				type: PARTY_IS_STARTED_REQUEST,
				payload: { id: partyId },
			});
		}, 5000);

		return () => clearInterval(timer);
	});

	useEffect(() => {
		if (isStarted) {
			dispatch(push(`/party/on/${[partyId]}`));
		}
	}, [isStarted, dispatch, partyId]);

	useEffect(() => {
		console.log("load party!");
		dispatch({
			type: PARTY_LOAD_REQUEST,
			payload: { id: partyId },
		});
		setSelectedUserId(null);
	}, [dispatch, partyId]);

	useEffect(() => {
		setLocalMsg(errorMsg);
	}, [errorMsg]);

	const onSelectionChanged = (e) => setSelectedUserId(e.value);

	const onClickBadge = (e) => {
		console.log(e);
	};

	const changeJudge = (e) => {
		e.preventDefault();

		dispatch({
			type: CHANGE_JUDGE_REQUEST,
			payload: {
				id: selectedUserId,
				partyId,
				token: localStorage.getItem("token"),
			},
		});
	};

	const exile = (e) => {
		e.preventDefault();

		if (selectedUserId) {
			dispatch({
				type: EXILE_REQUEST,
				payload: {
					id: selectedUserId,
					partyId,
					token: localStorage.getItem("token"),
				},
			});
		}
	};

	const exit = (e) => {
		e.preventDefault();
		dispatch({
			type: EXILE_REQUEST,
			payload: {
				id: user.id,
				partyId,
				token: localStorage.getItem("token"),
				next: "/",
			},
		});
	};

	const onStart = (e) => {
		e.preventDefault();

		dispatch({
			type: PARTY_START_REQUEST,
			payload: {
				partyId,
			},
		});
	};

	return (
		<>
			{localMsg && <Alert color="danger">{localMsg}</Alert>}
			{isLoading || party === null ? (
				<Spinner color="primary" />
			) : (
				<>
					<Row>
						<Col>
							<div className="text-primary font-weight-bold ml-2 mb-md-5 mb-sm-3 d-inline-block">
								<h3>
									파티 대기실<small>({party.participants.length})</small>{" "}
								</h3>
								<div>초대코드: {partyId}</div>
							</div>
						</Col>
						{isAuthenticated && user.id === party.host ? (
							<Col
								className="d-flex justify-content-end align-items-baseline"
								md="5"
							>
								<Selector
									className="flex-grow-1 my-sm-2 mr-sm-2"
									options={[
										{ value: null, label: "선택 안함" },
										...party.participants.map((user) => ({
											value: user._id,
											label: user.name,
										})),
									]}
									styles={{
										// Fixes the overlapping problem of the component
										menu: (provided) => ({ ...provided, zIndex: 9999 }),
									}}
									onChange={onSelectionChanged}
								/>
								<Button
									className="m-2 border-0 bg-primary text-light font-weight-bold"
									onClick={changeJudge}
								>
									심판 임명
								</Button>
								<Button
									className="m-2 border-0 bg-warning font-weight-bold"
									onClick={exile}
								>
									추방
								</Button>
							</Col>
						) : (
							<Col className="d-flex justify-content-end align-items-baseline">
								<Button
									className="m-2 border-0 bg-warning font-weight-bold"
									onClick={exit}
								>
									나가기
								</Button>
							</Col>
						)}
					</Row>
					<div className="user-waiting-background ">
						<div className="user-waiting-list d-flex flex-wrap justify-content-start align-content-start">
							{party.participants.map((user, idx) => (
								<Badge
									onClick={onClickBadge}
									key={user._id}
									className="user-badge text-primary p-2 mr-3 mb-4 bg-white font-weight-bolder overflow-hidden"
								>
									{user._id === party.host && (
										<FontAwesomeIcon
											icon={faCrown}
											className="d-inline mb-1 mr-1 fa-lg"
										/>
									)}
									{user._id === party.judge && (
										<FontAwesomeIcon
											icon={faJournalWhills}
											className="d-inline mb-1 mr-1 fa-lg"
										/>
									)}
									<h4 className="d-inline">{user.name}</h4>
								</Badge>
							))}
						</div>
						<Row>
							<Col sm={{ size: 10, offset: 1 }} md={{ size: 4, offset: 4 }}>
								<Button
									className="party-start-button py-3 border-0  bg-white text-primary font-weight-bold col-12"
									onClick={
										isAuthenticated && user.id === party.host ? onStart : null
									}
								>
									{isStarting ? (
										<Spinner />
									) : isAuthenticated && user.id === party.host ? (
										"파티 시작하기"
									) : (
										"파티 주최자가 시작하기를 기다리는 중..."
									)}
								</Button>
							</Col>
						</Row>
					</div>
				</>
			)}
		</>
	);
};

export default WaitingRoom;
