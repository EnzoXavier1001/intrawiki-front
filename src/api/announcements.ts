import type { IAnnouncements } from "../@types/Announcements";
import type { IPost } from "../@types/Post";
import axiosInstance from "../libs/axios";
import { getAuthHeaders } from "../utils/authHeaders";
import { formatDate } from "../utils/formatDate";
import { endpoints } from "./endpoints";

export async function createAnnouncements(data: IAnnouncements) {
	try {
		const res = await axiosInstance.post(endpoints.announcements, data);
		return res.data as IPost;
	} catch (error) {
		console.error("Erro ao criar evento:", error);
		throw error;
	}
}

export async function getAnnouncements() {
	try {
		const res = await axiosInstance.get(endpoints.announcements);
		const posts = res.data as IAnnouncements[];

		return posts.map((post) => ({
			...post,
			created_at: formatDate(post.createdAt),
		}));
	} catch (error) {
		console.error("Erro ao buscar posts:", error);
		throw error;
	}
}
