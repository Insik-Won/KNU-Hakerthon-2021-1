import app from "./app";
import { PORT } from "./config";
import partyApp from "./partyApp";

const server = app.listen(PORT, () => {
	console.log(`Server on: ${PORT}`);
});

partyApp.init(server);
