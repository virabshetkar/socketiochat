import mongoose from "mongoose";

export const connect = async () => {
	mongoose.set("strictQuery", false);
	await mongoose.connect("mongodb://localhost:27017/socket-io");
};
