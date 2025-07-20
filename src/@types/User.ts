export interface IUser {
	name: string;
	_id: string;
	email: string;
	password: string;
	biography?: string;
	avatarUrl?: string;
	linkedin?: string;
	github?: string;
	hobbies?: string[];
	createdAt: string;
}
