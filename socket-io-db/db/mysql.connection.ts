import { ConnectionConfig, createConnection, Query } from "mysql";

export const connection: ConnectionConfig = {
	host: "localhost",
	user: "socket-io-app",
	password: "Password",
	database: "socket-io-db",
};

export const conn = createConnection(connection);
