export const endpoints = {
	posts: "/posts",
	postById: (id: string) => `/posts/${id}`,
	postsByUserId: "/posts/search/user",
	searchPosts: "/posts/search",
	users: "/users",
	userById: (id: string) => `/users/${id}`,
};
