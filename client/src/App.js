import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter } from "react-router-dom";
import store, { history } from "./store";
import { MainRouter } from "./routes";

import "./assets/theme.scss";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";
//import "./assets/test-custom.scss";

function App() {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<MainRouter />
			</ConnectedRouter>
		</Provider>
	);
}

export default App;
