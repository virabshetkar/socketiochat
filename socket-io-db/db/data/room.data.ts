import { Room } from "../../models";
import { conn } from "../mysql.connection";

interface IRoomDb {
	createRoom(name: string, userid: string): Promise<Room>;
	fetchRoom(id: string, userid: string): Promise<Room>;
}

class RoomDb implements IRoomDb {
	constructor() {}

	createRoom(name: string, userid: string): Promise<Room> {
		return new Promise((res, rej) => {
			conn.query({ sql: "call create_room(?, ?)", values: [name, userid] }, (error, results, fields) => {
				if (error) rej(error);
				res(results[0][0] as Room);
			});
		});
	}
	fetchRoom(id: string, userid: string): Promise<Room> {
		throw new Error("Not implemented");
		return new Promise((res, rej) => {
			conn.query({ sql: "call fetch_room(?, ?)", values: [id, userid] }, (error, results, fields) => {
				if (error) rej(error);
				res(results[0][0] as Room);
			});
		});
	}
}

export const roomDb = new RoomDb();
