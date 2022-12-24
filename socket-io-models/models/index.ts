export interface Update {
	sender: string;
	displayName: string;
	to: string;
	timestamp: Date;
	type: "status" | "message";
}

export interface Status extends Update {
	type: "status";
	status: "online" | "offline";
}

export interface Message extends Update {
	message: string;
	type: "message";
}

export type User = {
	id: string;
	username: string;
	name: string;
};
