import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
	children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};
