import type { IUser } from "../@types/User";
import axiosInstance from "../libs/axios";
import type { UserInput } from "../pages/Login";
import { getAuthHeaders } from "../utils/authHeaders";
import { endpoints } from "./endpoints";

export async function authenticationUser(data: UserInput) {
	try {
		const res = await axiosInstance.post(endpoints.auth, {
			email: data.email,
			password: data.password,
		});

		return res;
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		throw error;
	}
}

export async function getUsers(): Promise<IUser[]> {
	try {
		const res = await axiosInstance.get(endpoints.users, getAuthHeaders());

		const users = res.data as IUser[];

		return users;
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		throw error;
	}
}

export async function getUserById(id: string): Promise<IUser> {
	try {
		const res = await axiosInstance.get(
			endpoints.userById(id),
			getAuthHeaders(),
		);

		const user = res.data as IUser;

		return user;
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		throw error;
	}
}
