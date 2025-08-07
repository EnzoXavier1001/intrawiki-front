export function getAuthHeaders() {
	const token = localStorage.getItem("token");

	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}
