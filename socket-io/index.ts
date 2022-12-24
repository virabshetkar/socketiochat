import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import { registerDisconnectEvent, registerMessageEvent } from "./events/client.events";
import { instrument } from "@socket.io/admin-ui";
import { registerConnectionEvent } from "./events/connection.events";
import { connect as dbconnect } from "socket-io-db/db/mongodb.connection";
import cors from "cors";

import { messageRoutes } from "./routes";

const init = async () => {
	//Connecting to database
	await dbconnect().then(() => {
		console.log("connected to mongodb..");
	});

	//Initializing the webserver with socket.io
	const app = express();
	const server = http.createServer(app);
	const io = new Server(server, { cors: { origin: ["http://localhost:4200", "https://admin.socket.io/"] } });

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors({ origin: ["http://localhost:4200"] }));

	app.use("/messages", messageRoutes.default);

	const connection = (socket: Socket) => {
		registerConnectionEvent(io, socket);
		registerMessageEvent(io, socket);
		registerDisconnectEvent(io, socket);
	};

	instrument(io, { auth: false });

	io.on("connection", connection);

	io.on("connection_error", (...params) => {
		console.log(params);
	});

	server.listen(3000, () => {
		console.log("Listening now");
	});
};

init();
