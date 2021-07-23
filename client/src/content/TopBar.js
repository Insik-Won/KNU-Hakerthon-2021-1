import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import {
	Navbar,
	Button,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	NavbarBrand,
} from "reactstrap";
import { Link } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
	const [topbarIsOpen, setTopbarOpen] = useState(true);
	const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

	return (
		<Navbar
			sticky="top"
			color="light"
			light
			className="navbar shadow-sm p-3 mb-5 bg-white rounded"
			expand="md"
		>
			<Button color="primary" onClick={toggleSidebar}>
				<FontAwesomeIcon icon={faAlignJustify} />
			</Button>
			<NavbarBrand className="ml-4 text-primary font-weight-bold">
				Party Knight!
			</NavbarBrand>
			<NavbarToggler onClick={toggleTopbar} />
			<Collapse isOpen={topbarIsOpen} navbar>
				<Nav className="ml-auto" navbar></Nav>
			</Collapse>
		</Navbar>
	);
};

export default Topbar;
