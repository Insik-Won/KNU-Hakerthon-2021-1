import app from "./app";
import chatApp from "./chatApp";
import { PORT } from "./config";

app.listen(PORT, () => {
	console.log(`Server on: ${PORT}`);
});

chatApp.listen(PORT + 1, () => {
	console.log(`Chat Server on: ${PORT + 1}`);
});
