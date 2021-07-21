const net = require("net");
const readline = require("readline");

const io = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const client = net.connect({ port: 7001, host: "localhost" });

client.on("connect", () => {
	io.question("Name: ", (name) => {
		client.write(
			JSON.stringify({
				type: "CONNECT",
				content: `${name}`,
			})
		);

		io.on("line", (line) => {
			client.write(
				JSON.stringify({
					type: "CHAT",
					content: `${name}: ${line}`,
				})
			);
		});
	});
});

client.on("data", (data) => {
	console.log(data.toString());
});

client.on("close", () => {
	console.log("ended");
});
