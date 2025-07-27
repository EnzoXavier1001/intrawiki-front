import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { DefaultLayout } from "../layouts/default";
import { Post } from "../pages/Post";
import { CreatePost } from "../pages/Post/create";

export const privateRoutes = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "/profile/:id", element: <Profile /> },
			{ path: "/create", element: <CreatePost /> },
			{ path: "/post/:id", element: <Post /> },
		],
	},
]);
