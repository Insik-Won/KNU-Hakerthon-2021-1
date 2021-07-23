import { MISSION_SECOND, MISSION_SUBMIT, TEST_REQUEST } from "../types";

class PartyClient {
	dispatch = () => {};
	ws = null;

	constructor(address, partyId, userId, dispatch) {
		const ws = new WebSocket(address);
		this.ws = ws;
		this.dispatch = dispatch;

		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					type: "REGISTER",
					partyId,
					userId,
				})
			);
		};

		ws.onmessage = function (event) {
			const data = JSON.parse(event.data);

			switch (data.type) {
				case "MISSION_SECOND":
					dispatch({
						type: MISSION_SECOND,
						payload: { second: data.payload },
					});
					break;
				default:
					dispatch({
						type: data.type,
						payload: data.payload,
					});
					break;
			}
		};
	}

	send(data) {
		this.ws.send(JSON.stringify(data));
	}
}

export default PartyClient;
