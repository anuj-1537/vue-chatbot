<template>
	<div class="hello">
		<div class="title">
			<h1>{{ msg }}</h1>
			<img src="../assets/bot.gif" alt="bot" width="80px" height="60px" />
		</div>

		<div class="chat-window">
			<div class="chat-list-container">
				<ul class="chat-list" v-if="msgList.length != 0">
					<li
						class="message"
						v-for="(msg, index) in msgList"
						:key="index"
					>
						<span
							:class="index % 2 != 0 ? 'black-bg' : 'white-bg'"
							>{{ msg }}</span
						>
						<br />
					</li>
				</ul>
			</div>
			<div class="chat-input-container">
				<div v-if="username.length == 0">
					<input
						type="text"
						name="username"
						v-model="username"
						@keyup.enter="setUsername()"
						placeholder="enter your username"
					/>
				</div>
				<div v-else>
					<input
						type="text"
						name="message"
						v-model="message"
						@keyup.enter="sendMsg()"
					/>
				</div>

				<button @click="sendMsg()">Send</button>
			</div>
		</div>
	</div>
</template>

<script>
// import { nlp } from "../nlp";
import SocketioService from "../services/socketio.service";
export default {
	name: "Chatbox",
	data() {
		return {
			message: "",
			msgList: [],
			username: "",
			// MY_TOKEN: "KGTIWVV5DYIS2NASXEQXD37QN5L63IIR",
		};
	},
	props: {
		msg: String,
	},
	methods: {
		sendMsg() {
			if (this.message != "") {
				this.msgList.push(this.message);
				SocketioService.sendMsg(this.message);
				this.message = "";
				console.log("in send msg");
			}
		},
		setUsername(name) {
			this.username = name;
			console.log("in set username");
		},
	},
	created() {
		SocketioService.setupSocketConnection();
		this.username = "";
	},
	beforeUnmount() {
		SocketioService.disconnect();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}

.chat-window {
	border: 3px solid tomato;
	border-radius: 4px;
	width: 40%;
	margin-left: 400px;
	padding: 20px;
	height: 300px;
}

.title {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
button {
	background-color: #42b983;
	padding: 7px;
	border: none;
	margin-left: 10px;
	border-radius: 4px;
	position: absolute;
	top: 415px;
	left: 800px;
}
button:hover {
	transform: scale(1.1);
}
input[type="text"] {
	position: absolute;
	top: 420px;
	right: 570px;
}
.chat-list {
	display: flex;
	flex-direction: column;
}

.white-bg {
	color: black;
	background-color: whitesmoke;
	text-align: right;
	margin: 50px;
	vertical-align: text-bottom;
}
@font-face {
	font-family: myFirstFont;
	src: url("https://fonts.googleapis.com/css2?family=Encode+Sans+Semi+Condensed:wght@300&display=swap");
}
.black-bg {
	background-color: lightgrey;
	color: blue;
	text-align: left;
	margin: 50px;
	font-family: myFirstFont;
	vertical-align: text-bottom;
}
.chat-list-container {
	overflow: auto;
	height: 200px;
}
/* width */
::-webkit-scrollbar {
	width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px grey;
	border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: violet;
	border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: violet;
}
</style>
