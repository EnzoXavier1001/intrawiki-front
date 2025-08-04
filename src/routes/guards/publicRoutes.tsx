import { Navigate } from "react-router";
import { useUser } from "../../hooks/useUser";

interface PublicRouteProps {
	children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
	const { user } = useUser();

	if (user) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};
