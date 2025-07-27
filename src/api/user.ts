// src/api/post.ts

import type { IUser } from "../@types/User";
import axiosInstance from "../libs/axios";
import { endpoints } from "./endpoints";

export async function getUsers(): Promise<IUser[]> {
	try {
		const res = await axiosInstance.get(endpoints.users, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`,
			},
		});

		const users = res.data as IUser[];

		return users;
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		throw error;
	}
}

export async function getUserById(id: string): Promise<IUser> {
	try {
		const res = await axiosInstance.get(endpoints.userById(id), {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`,
			},
		});

		const user = res.data as IUser;

		return user;
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		throw error;
	}
}
