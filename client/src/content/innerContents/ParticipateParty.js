import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Label, Input, Button } from "reactstrap";
import { PARTICIPATE_REQUEST } from "../../redux/types";

const ParticipateParty = () => {
	const [partyId, setPartyId] = useState("");
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const isOkay = isAuthenticated && user !== null;

	const onChange = (e) => setPartyId(e.target.value);

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch({
			type: PARTICIPATE_REQUEST,
			payload: { partyId, token: localStorage.getItem("token") },
		});
	};

	return (
		<>
			<h3 className="text-primary font-weight-bold">Participate a Party!</h3>
			<Form className="mt-3 col-7 ml-0" onSubmit={onSubmit}>
				<Label for="partyId">
					{isOkay ? "초대코드를 입력하세요" : "로그인하고 오세요!"}
				</Label>
				<Input
					type="text"
					name="partyId"
					id="partyId"
					placeholder="토큰"
					disabled={!isOkay}
					onChange={onChange}
				/>
				<Button disabled={!isOkay} color="primary" className="mt-3">
					참가하기
				</Button>
			</Form>
		</>
	);
};

export default ParticipateParty;
