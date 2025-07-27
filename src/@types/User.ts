export interface IUser {
	name: string;
	_id: string;
	email: string;
	password: string;
	biography?: string;
	avatarUrl?: string;
	linkedin?: string;
	github?: string;
	skills?: string[];
	hobbies?: string[];
	createdAt: string;
	badges: string[];
}
