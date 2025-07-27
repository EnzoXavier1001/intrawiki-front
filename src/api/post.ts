// src/api/post.ts

import type { IPost } from "../@types/Post";
import axiosInstance from "../libs/axios";
import { formatDate } from "../utils/formatDate";
import { endpoints } from "./endpoints";

export async function createPost(data: IPost): Promise<IPost> {
	try {
		const res = await axiosInstance.post(endpoints.posts, data, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`,
			},
		});

		const posts = res.data as IPost;

		return posts;
	} catch (error) {
		console.error("Erro ao buscar posts:", error);
		throw error;
	}
}

export async function getPosts(): Promise<IPost[]> {
	try {
		const res = await axiosInstance.get(endpoints.posts, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`,
			},
		});

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
		const res = await axiosInstance.get(endpoints.postById(id), {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`,
			},
		});

		const post = res.data as IPost;

		return post;
	} catch (error) {
		console.error("Erro ao buscar posts:", error);
		throw error;
	}
}

export async function getPostByUserId(id: string): Promise<IPost[]> {
	try {
		const res = await axiosInstance.get(endpoints.postsByUserId, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`,
			},
			params: {
				id,
			},
		});

		const post = res.data as IPost[];

		return post;
	} catch (error) {
		console.error("Erro ao buscar posts:", error);
		throw error;
	}
}

export async function searchPosts(search: string): Promise<IPost[]> {
	try {
		const res = await axiosInstance.get(endpoints.searchPosts, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`,
			},
			params: {
				search,
			},
		});

		const post = res.data as IPost[];

		return post;
	} catch (error) {
		console.error("Erro ao buscar posts:", error);
		throw error;
	}
}
