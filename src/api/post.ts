import type { IPost } from "../@types/Post";
import axiosInstance from "../libs/axios";
import { getAuthHeaders } from "../utils/authHeaders";
import { formatDate } from "../utils/formatDate";
import { endpoints } from "./endpoints";

export async function createPost(data: IPost): Promise<IPost> {
	try {
		const res = await axiosInstance.post(
			endpoints.posts,
			data,
			getAuthHeaders(),
		);
		return res.data as IPost;
	} catch (error) {
		console.error("Erro ao criar post:", error);
		throw error;
	}
}

export async function getPosts(): Promise<IPost[]> {
	try {
		const res = await axiosInstance.get(endpoints.posts, getAuthHeaders());
		const posts = res.data as IPost[];

		return posts.map((post) => ({
			...post,
			created_at: formatDate(post.createdAt),
		}));
	} catch (error) {
		console.error("Erro ao buscar posts:", error);
		throw error;
	}
}

export async function getPostById(id: string): Promise<IPost> {
	try {
		const res = await axiosInstance.get(
			endpoints.postById(id),
			getAuthHeaders(),
		);
		return res.data as IPost;
	} catch (error) {
		console.error("Erro ao buscar post:", error);
		throw error;
	}
}

export async function getPostByUserId(id: string): Promise<IPost[]> {
	try {
		const res = await axiosInstance.get(endpoints.postsByUserId, {
			...getAuthHeaders(),
			params: { id },
		});
		return res.data as IPost[];
	} catch (error) {
		console.error("Erro ao buscar posts por usuário:", error);
		throw error;
	}
}

export async function searchPosts(category: string): Promise<IPost[]> {
	try {
		const res = await axiosInstance.get(endpoints.searchPosts, {
			...getAuthHeaders(),
			params: { category },
		});
		return res.data as IPost[];
	} catch (error) {
		console.error("Erro ao buscar posts:", error);
		throw error;
	}
}
