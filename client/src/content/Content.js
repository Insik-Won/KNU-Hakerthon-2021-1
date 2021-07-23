import React, { createRef } from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import {
	Welcome,
	CreateParty,
	ParticipateParty,
	WaitingRoom,
} from "./innerContents";

import Topbar from "./TopBar";
import PartyOn from "./innerContents/PartyOn";

const Content = ({ sidebarIsOpen, toggleSidebar }) => {
	const topbarRef = createRef();

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": sidebarIsOpen })}
		>
			<Topbar id="topbar" toggleSidebar={toggleSidebar} />
			<Switch>
				<Route exact path="/" component={Welcome} />
				<Route exact path="/party/create" component={CreateParty} />
				<Route exact path="/party/waiting/:partyId" component={WaitingRoom} />
				<Route exact path="/party/participate" component={ParticipateParty} />
				<Route exact path="/party/on/:partyId" component={PartyOn} />
				<Redirect from="*" to="/" />
			</Switch>
		</Container>
	);
};

export default Content;
