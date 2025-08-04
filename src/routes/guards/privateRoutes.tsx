import { Navigate } from "react-router";
import { useUser } from "../../hooks/useUser";

interface PrivateRouteProps {
	children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { user } = useUser();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};
