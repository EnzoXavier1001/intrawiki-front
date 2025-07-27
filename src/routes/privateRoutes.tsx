import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { DefaultLayout } from "../layouts/default";
import { Post } from "../pages/Post";

export const privateRoutes = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "/profile/:id", element: <Profile /> },
			{ path: "/post/:id", element: <Post /> },
		],
	},
]);
