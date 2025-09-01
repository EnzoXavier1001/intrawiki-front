import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useAuth = () => {
	const { user, handleLogin, handleLogout } = useContext(UserContext);

	return {
		user,
		handleLogin,
		handleLogout,
	};
};
