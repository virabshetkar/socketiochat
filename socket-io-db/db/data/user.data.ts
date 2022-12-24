import { User } from "socket-io-models/models";
import { conn } from "../mysql.connection";

interface IUserDb {
	createUser(username: string, name: string): Promise<User>;
	fetchUser(username: string): Promise<User>;
}

export class UserDb implements IUserDb {
	constructor() {}

	async createUser(username: string, name: string): Promise<User> {
		return new Promise((res, rej) => {
			conn.query(
				{
					sql: "call create_user(?, ?)",
					values: [username, name],
				},
				(error, results, fields) => {
					if (error) rej(error);
					res(results[0][0] as User);
				}
			);
		});
	}

	fetchUser(username: string): Promise<User> {
		return new Promise((res, rej) => {
			conn.query(
				{
					sql: "call fetch_user(?)",
					values: [username],
				},
				(error, results, fields) => {
					if (error) rej(error);
					res(results[0][0] as User);
				}
			);
		});
	}
}

export const userDb = new UserDb();
