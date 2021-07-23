import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faDice,
	faDoorClosed,
	faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import LoginRegister from "./Auth/LoginRegister";
import Profile from "./Auth/Profile";
import { LOGOUT_REQUEST } from "../redux/types";

const SideBar = ({ isOpen, toggle }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch({
			type: LOGOUT_REQUEST,
		});
	};

	return (
		<div className={classNames("sidebar", { "is-open": isOpen })}>
			<div className="sidebar-header">
				<span color="info" onClick={toggle} style={{ color: "#fff" }}>
					&times;
				</span>
				{isAuthenticated ? <Profile /> : <LoginRegister />}
			</div>
			<div className="side-menu ">
				<Nav vertical className="pb-3 list-unstyled ">
					<NavLink tag={Link} className="caption" to={"/"}>
						파티나이트!
					</NavLink>
					<NavItem>
						<NavLink tag={Link} to={"/party/create"}>
							<FontAwesomeIcon icon={faDice} className="mr-2" />
							파티 만들기
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={"/party/participate"}>
							<FontAwesomeIcon icon={faDoorOpen} className="mr-2" />
							파티 참가하기
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={"#"} onClick={logout}>
							<FontAwesomeIcon icon={faDoorClosed} className="mr-2" />
							로그아웃하기
						</NavLink>
					</NavItem>
				</Nav>
			</div>
		</div>
	);
};

export default SideBar;
