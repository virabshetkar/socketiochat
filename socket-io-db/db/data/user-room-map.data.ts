import { Room } from "../../models";
import { conn } from "../mysql.connection";

interface IUserRoomMapDb {
	createUserRoomMap(userId: string, roomId: string): Promise<void>;
	fetchUsersRooms(id: string): Promise<Room[]>;
}

class UserRoomMapDb implements IUserRoomMapDb {
	constructor() {}

	createUserRoomMap(userId: string, roomId: string): Promise<void> {
		return new Promise((res, rej) => {
			conn.query(
				{
					sql: "create_user_room_map(?, ?)",
					values: [userId, roomId],
				},
				(error, results, fields) => {
					if (error) rej(error);
					res();
				}
			);
		});
	}

	fetchUsersRooms(id: string): Promise<Room[]> {
		return new Promise((res, rej) => {
			conn.query(
				{
					sql: "create_user_room_map(?, ?)",
					values: [id],
				},
				(error, results, fields) => {
					if (error) rej(error);
					res(results[0] as Room[]);
				}
			);
		});
	}
}

export const userRoomMapDb = new UserRoomMapDb();
