import { Schema } from "mongoose";
import { Status } from "socket-io-models/models";
import { UpdateModel } from "./update.schema";

const statusSchema = new Schema<Status>({
	status: {
		type: String,
		enum: ["online", "offline", "joined"],
	},
});

export const StatusModel = UpdateModel.discriminator<Status>("status", statusSchema);
