import { io } from "socket.io-client";

class SocketioService {
	socket;
	constructor() {}

	setupSocketConnection() {
		this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
	}
	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
		}
	}
	sendMsg(data) {
		this.socket.emit("my message", data);
		this.socket.on("my broadcast", (data) => {
			console.log(data);
		});
	}
}

export default new SocketioService();
