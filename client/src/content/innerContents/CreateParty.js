import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Alert,
	Button,
	CardImg,
	CustomInput,
	Form,
	Input,
	Label,
	Spinner,
} from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
	MISSIONSET_ERROR_CLEAR_REQUEST,
	MISSIONSET_LOAD_REQUEST,
	PARTY_CREATE_REQUEST,
	PARTY_ERROR_CLEAR_REQUEST,
} from "../../redux/types";
import classNames from "classnames";
import { push } from "connected-react-router";

const animatedComponents = makeAnimated();

const CreateParty = () => {
	const [form, setValues] = useState({
		name: "",
		description: "",
		prizeImage: "",
		prizeDescription: "",
	});
	const [localMsg, setLocalMsg] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [currentSets, setCurrentSets] = useState([]);
	const { isLoading, missionSets, errorMsg } = useSelector(
		(state) => state.missions
	);
	const { errorMsg: partyErrorMsg } = useSelector((state) => state.party);
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: MISSIONSET_LOAD_REQUEST,
		});
	}, [dispatch]);

	useEffect(() => {
		try {
			setLocalMsg(errorMsg);
		} catch (e) {
			console.error(e);
		}
	}, [errorMsg]);

	useEffect(() => {
		try {
			setLocalMsg(partyErrorMsg);
		} catch (e) {
			console.error(e);
		}
	}, [partyErrorMsg]);

	const onChange = (e) => {
		e.preventDefault();
		setValues({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const onFileChange = (e) => {
		e.preventDefault();
		setValues({
			...form,
			[e.target.name]: e.target.files[0],
		});

		try {
			const url = URL.createObjectURL(e.target.files[0]);
			setImgUrl(url);
		} catch (e) {
			console.log(e);
		}
	};

	const onSetsChanged = (sets) => {
		setCurrentSets(sets.map((form) => form.value._id));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (const key in form) {
			formData.append(key, form[key]);
		}
		formData.append("host", user.id);
		formData.append("missionSets", currentSets);
		formData.token = localStorage.getItem("token");

		dispatch({
			type: PARTY_CREATE_REQUEST,
			payload: formData,
		});

		dispatch({
			type: MISSIONSET_ERROR_CLEAR_REQUEST,
		});

		dispatch({
			type: PARTY_ERROR_CLEAR_REQUEST,
		});
	};

	return (
		<Form className="party-create-form" onSubmit={onSubmit}>
			{localMsg && <Alert color="danger"> {localMsg} </Alert>}
			{isLoading || missionSets === null ? (
				<Spinner color="primary" />
			) : (
				<>
					<Label
						tag="h3"
						className="text-primary font-weight-bold ml-2 mb-5 "
						for="title"
					>
						파티 만들기
					</Label>
					<Label for="name" className="party-create-form-label">
						파티 이름
					</Label>
					<Input
						type="text"
						name="name"
						id="name"
						placeholder="파티 이름"
						onChange={onChange}
					/>
					<Label for="description" className="party-create-form-label">
						파티 설명
					</Label>
					<Input
						type="textarea"
						name="description"
						id="description"
						placeholder="파티 설명"
						onChange={onChange}
					/>
					<Label for="missionSets" className="party-create-form-label">
						미션셋 고르기
					</Label>
					<Select
						aria-live="assertive"
						placeholder="미션셋 고르기"
						noOptionsMessage={() => "더이상 없습니다."}
						closeMenuOnSelect={false}
						componenets={animatedComponents}
						isMulti
						options={missionSets.map((set) => ({
							value: set,
							label: set.title,
						}))}
						styles={{
							// Fixes the overlapping problem of the component
							menu: (provided) => ({ ...provided, zIndex: 9999 }),
						}}
						onChange={onSetsChanged}
					/>
					<Label for="prizeImage" className="party-create-form-label border-wi">
						보상 사진
					</Label>
					<CardImg
						src={imgUrl}
						className={classNames("col-4 rounded p-0 d-flex ml-0", {
							"mb-3 cardImg": imgUrl !== "",
						})}
					/>
					<CustomInput
						type="file"
						name="prizeImage"
						id="prizeImage"
						label="보상 사진 고르기"
						onChange={onFileChange}
					/>
					<Label for="prizeDescription" className="party-create-form-label">
						보상 설명
					</Label>
					<Input
						type="textarea"
						name="prizeDescription"
						id="prizeDescription"
						placeholder="보상 설명"
						onChange={onChange}
					/>
					<Button className="mt-3 col-sm-12 col-md-auto">파티 만들기</Button>
				</>
			)}
		</Form>
	);
};

export default CreateParty;
