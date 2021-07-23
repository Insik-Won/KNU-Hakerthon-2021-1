import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	NavLink,
	Modal,
	ModalHeader,
	ModalBody,
	Alert,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";

const LoginModal = ({ isOpen, toggle }) => {
	const [localMsg, setLocalMsg] = useState("");
	const [form, setValues] = useState({
		email: "",
		password: "",
	});

	const dispatch = useDispatch();
	const { errorMsg } = useSelector((state) => state.auth);
	useEffect(() => {
		try {
			setLocalMsg(errorMsg);
		} catch (e) {
			console.log(e);
		}
	}, [errorMsg]);

	const handleToggle = () => {
		dispatch({
			type: CLEAR_ERROR_REQUEST,
		});
		toggle();
	};

	const onChange = (e) => {
		setValues({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { email, password } = form;
		const user = { email, password };
		dispatch({
			type: LOGIN_REQUEST,
			payload: user,
		});
	};

	return (
		<div>
			<Modal isOpen={isOpen} toggle={handleToggle}>
				<ModalHeader toggle={handleToggle}>Login</ModalHeader>
				<ModalBody>
					{localMsg && <Alert color="danger">{localMsg}</Alert>}
					<Form onSubmit={onSubmit}>
						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							onChange={onChange}
						/>
						<Label for="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							onChange={onChange}
						/>
						<Button color="primary" style={{ marginTop: "2rem" }}>
							Login
						</Button>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default LoginModal;
