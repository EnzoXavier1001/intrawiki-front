import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { DefaultLayout } from "../layouts/default";
import { Register } from "../components/Register";

export const privateRoutes = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "profile/:id", element: <Profile /> },
		],
	},
	{
		path: "/register",
		element: <Register />,
	},
]);
