import { Schema } from "mongoose";
import { Message } from "socket-io-models/models";
import { options, UpdateModel } from "./update.schema";

const messageSchema = new Schema<Message>(
	{
		message: {
			type: String,
			required: true,
		},
	},
	options
);

export const MessageModel = UpdateModel.discriminator<Message>("message", messageSchema);

const x = new MessageModel({ sender: "" });
