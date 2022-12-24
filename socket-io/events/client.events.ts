import { Server, Socket } from "socket.io";
import { Message, Status, User } from "socket-io-models";
import { MessageModel, StatusModel } from "socket-io-db/db/schemas";

export const registerMessageEvent = (io: Server, socket: Socket) => {
	socket.on("message", async (message: string, to: string, success: (message: Message) => void) => {
		const user = socket.data.user as User;
		const mes = await MessageModel.create({
			sender: user.id,
			message,
			displayName: user.name,
			to,
		});

		success(mes);
		socket.to(to).emit("message", mes);

		console.log(`${user.name}: ${message}`);
	});
};

export const registerStatusEvent = (socket: Socket) => {
	socket.on("status", async (status: string) => {});
};

export const registerDisconnectEvent = (io: Server, socket: Socket) => {
	socket.on("disconnect", async (params) => {
		const user = socket.data.user as User;
		if (user) {
			const status = await StatusModel.create({
				status: "offline",
				sender: user.id,
				displayName: user.name,
				to: user.id,
			});
			socket.to([user.id, "global-chatroom"]).emit("status", status);
			console.log(`${user.name} left the chat`);
		}
	});
};
