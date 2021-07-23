import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Alert,
	Form,
	FormGroup,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	NavLink,
	Input,
	Button,
	CardImg,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";

const RegisterModal = ({ isOpen, toggle }) => {
	const [form, setValues] = useState({
		name: "",
		email: "",
		password: "",
		img: null,
		description: "",
	});
	const [imgUrl, setImgUrl] = useState("");
	const [localMsg, setLocalMsg] = useState("");
	const { errorMsg } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		try {
			setLocalMsg(errorMsg);
		} catch (e) {
			console.error(e);
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

	const onFileChange = (e) => {
		setValues({
			...form,
			[e.target.name]: e.target.files[0],
		});

		const url = URL.createObjectURL(e.target.files[0]);
		setImgUrl(url);
		console.log(url);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (const key in form) {
			formData.append(key, form[key]);
		}

		dispatch({
			type: REGISTER_REQUEST,
			payload: formData,
		});
	};

	return (
		<div>
			<Modal isOpen={isOpen} toggle={handleToggle}>
				<ModalHeader toggle={handleToggle}>회원가입</ModalHeader>
				<ModalBody>
					{localMsg && <Alert color="danger"> {localMsg} </Alert>}
					<Form onSubmit={onSubmit}>
						<FormGroup className="register-form">
							<Label for="abc">이름</Label>
							<Input
								type="text"
								name="name"
								id="name"
								placeholder="Name"
								onChange={onChange}
							/>
							<Label for="email">이메일</Label>
							<Input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								onChange={onChange}
							/>
							<Label for="password">비밀번호</Label>
							<Input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								onChange={onChange}
							/>
							<Label for="url">프로필 사진</Label>
							<CardImg src={imgUrl} className="mb-2 rounded" />
							<Input
								type="file"
								name="img"
								id="img"
								accept=".gif, .jpg, .jpeg, .png"
								onChange={onFileChange}
							/>
							<Label for="description">한줄 설명</Label>
							<Input
								type="textarea"
								name="description"
								id="description"
								onChange={onChange}
							/>
							<Button color="primary" className="mt-2" block>
								가입하기
							</Button>
						</FormGroup>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default RegisterModal;
