import { model, Schema } from "mongoose";
import { Update } from "socket-io-models/models";
export const options = { discriminatorKey: "type" };

export const updateSchema = new Schema<Update>(
	{
		type: {
			type: String,
			required: true,
		},
		sender: {
			type: String,
			required: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
		timestamp: {
			type: Date,
			default: Date.now,
		},
	},
	options
);

export const UpdateModel = model("Update", updateSchema);
