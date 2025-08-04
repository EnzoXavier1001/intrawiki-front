import type { IPost } from "../@types/Post";
import axiosInstance from "../libs/axios";
import { formatDate } from "../utils/formatDate";
import { endpoints } from "./endpoints";

function getAuthHeader() {
	const token = localStorage.getItem("token");
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

export async function createPost(data: IPost): Promise<IPost> {
	try {
		const res = await axiosInstance.post(
			endpoints.posts,
			data,
			getAuthHeader(),
		);
		return res.data as IPost;
	} catch (error) {
		console.error("Erro ao criar post:", error);
		throw error;
	}
}

export async function getPosts(): Promise<IPost[]> {
	try {
		const res = await axiosInstance.get(endpoints.posts, getAuthHeader());
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
			getAuthHeader(),
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
			...getAuthHeader(),
			params: { id },
		});
		return res.data as IPost[];
	} catch (error) {
		console.error("Erro ao buscar posts por usuário:", error);
		throw error;
	}
}

export async function searchPosts(search: string): Promise<IPost[]> {
	try {
		const res = await axiosInstance.get(endpoints.searchPosts, {
			...getAuthHeader(),
			params: { search },
		});
		return res.data as IPost[];
	} catch (error) {
		console.error("Erro ao buscar posts:", error);
		throw error;
	}
}
