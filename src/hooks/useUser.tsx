import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
	const { user, handleLogin, handleLogout } = useContext(UserContext);

	return {
		user,
		handleLogin,
		handleLogout,
	};
};
