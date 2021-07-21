// TCP
import net from "net";

let pool = [];

const chatApp = net.createServer((socket) => {
	pool.push(socket);
	socket.on("data", (data) => {
		let d = JSON.parse(data);

		console.log("on:", d);
		switch (d.type) {
			case "CONNECT":
				for (let s of pool) {
					console.log("connect");
					s.write(d.content + " connected!");
				}
				break;
			case "CHAT":
				for (let s of pool) {
					console.log("chat");
					s.write(d.content);
				}
				break;
		}
	});

	socket.on("error", (e) => {
		const exitSocket = pool.findIndex((item) => item === socket);
		if (exitSocket > -1) pool.splice(exitSocket, 1);
		for (let s of pool) s.write("Someone's out.");
	});
});

export default chatApp;
