import { createContext, ReactNode, useState, useEffect } from "react";
import { authenticationUser } from "../api/user";
import type { UserAuth } from "../@types/Auth";
import type { IUser } from "../@types/User";

interface UserContextType {
	user: IUser | null;
	handleLogin: (data: UserAuth) => boolean;
	handleLogout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
	undefined,
);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	async function handleLogin(userData: UserAuth): Promise<boolean> {
		try {
			const { data } = await authenticationUser(userData);
			console.log(data);
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

			setUser(data.user);
			return true;
		} catch (error) {
			console.error("Erro ao fazer login:", error);
			return false;
		}
	}

	async function handleLogout(): Promise<boolean> {
		try {
			localStorage.removeItem("token");
			localStorage.removeItem("user");

			setUser(null);

			return true;
		} catch (error) {
			console.error("Erro ao fazer logout:", error);
			return false;
		}
	}

	return (
		<UserContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</UserContext.Provider>
	);
};
