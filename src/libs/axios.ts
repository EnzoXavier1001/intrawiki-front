import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.error("API Error:", error?.response || error);
		return Promise.reject(error);
	},
);

export default axiosInstance;
