import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBriefcase,
	faCopy,
	faHome,
	faImage,
	faPaperPlane,
	faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "./TestSubMenu";

const SideBar = ({ isOpen, toggle }) => (
	<div className={classNames("sidebar", { "is-open": isOpen })}>
		<div className="sidebar-header">
			<span color="info" onClick={toggle} style={{ color: "#fff" }}>
				&times;
			</span>
			<h3>Bootstrap Sidebar</h3>
		</div>
		<div className="side-menu ">
			<Nav vertical className="pb-3 list-unstyled ">
				<p>Dummy Heading</p>
				<SubMenu title="Home" icon={faHome} items={submenus[0]} />
				<NavItem>
					<NavLink tag={Link} to={"/pages"}>
						<FontAwesomeIcon icon={faBriefcase} className="mr-2" />
						About
					</NavLink>
				</NavItem>
				<SubMenu title="Pages" icon={faCopy} items={submenus[1]} />
				<NavItem>
					<NavLink tag={Link} to={"/pages"}>
						<FontAwesomeIcon icon={faImage} className="mr-2" />
						Portofolio
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink tag={Link} to={"/faq"}>
						<FontAwesomeIcon icon={faQuestion} className="mr-2" />
						FAQ
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink tag={Link} to={"/contact"}>
						<FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
						Contact
					</NavLink>
				</NavItem>
			</Nav>
		</div>
	</div>
);

const submenus = [
	[
		{
			title: "Home 1",
			target: "Home-1",
		},
		{
			title: "Home 2",
			target: "Home-2",
		},
		{
			title: "Home 3",
			target: "Home-3",
		},
	],
	[
		{
			title: "Page 1",
			target: "Page-1",
		},
		{
			title: "Page 2",
			target: "Page-2",
		},
	],
];

export default SideBar;
