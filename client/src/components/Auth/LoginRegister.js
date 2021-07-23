import React, { useState } from "react";
import { Button } from "reactstrap";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Profile = () => {
	const [isLoginOpen, setLoginOpen] = useState(false);
	const [isRegisterOpen, setRegisterOpen] = useState(false);

	const loginToggle = () => {
		setLoginOpen(!isLoginOpen);
	};
	const registerToggle = () => {
		setRegisterOpen(!isRegisterOpen);
	};

	return (
		<>
			<Button
				onClick={loginToggle}
				color="primary"
				className="m-2 border-light"
			>
				로그인
			</Button>
			<Button
				onClick={registerToggle}
				color="primary"
				className="m-2 border-light"
			>
				회원가입
			</Button>
			<LoginModal isOpen={isLoginOpen} toggle={loginToggle} />
			<RegisterModal isOpen={isRegisterOpen} toggle={registerToggle} />
		</>
	);
};

export default Profile;
