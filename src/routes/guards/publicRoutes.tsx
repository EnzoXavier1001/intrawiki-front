import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface PublicRouteProps {
	children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
	const { user } = useAuth();

	if (user) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};
