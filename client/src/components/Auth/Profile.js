import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

const Profile = () => {
	const { user } = useSelector((state) => state.auth);

	return (
		<Card className="m-2 p-2 profile">
			<CardImg
				top
				className="profile-img"
				src={user.img}
				alt="이미지가 없습니다."
			/>
			<CardTitle tag="h5" className="m-2 text-dark font-weight-bold">
				{user.name}
			</CardTitle>
			<CardSubtitle className="ml-2 text-primary font-weight-bold">
				{user.description}
			</CardSubtitle>
		</Card>
	);
};

export default Profile;
