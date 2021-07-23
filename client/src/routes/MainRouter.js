import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SideBar from "../components/SideBar";
import Content from "../content/Content";
import PartyOn from "../content/innerContents/PartyOn";

const MainRouter = () => {
	const [sidebarIsOpen, setSidebaOpen] = useState(false);
	const toggleSidebar = () => setSidebaOpen(!sidebarIsOpen);

	return (
		<div className="App wrapper">
			<SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
			<Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
		</div>
	);
};

export default MainRouter;
