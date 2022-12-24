import { Server, Socket } from "socket.io";
import { userDb } from "socket-io-db/db/data";
import { StatusModel } from "socket-io-db/db/schemas";

export const registerConnectionEvent = async (io: Server, socket: Socket) => {
	let username = socket.handshake.auth.username;
	try {
		const user = await userDb.fetchUser(username);
		console.log(user);

		if (!user) {
			socket.disconnect(true);
			return;
		}

		socket.data.user = user;
		socket.emit("authenticated", user);
		socket.join("global-chatroom");

		const statusObj = await StatusModel.create({
			sender: user.id,
			displayName: user.name,
			status: "online",
			to: user.id,
		});
		socket.to([user.id, "global-chatroom"]).emit("status", statusObj);
	} catch (err) {
		socket.disconnect(true);
		return;
	}
};
