import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { DefaultLayout } from "../layouts/default";
import { Post } from "../pages/Post";
import { CreatePost } from "../pages/Post/create";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./guards/privateRoutes";
import { PublicRoute } from "./guards/publicRoutes";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<DefaultLayout />
			</PrivateRoute>
		),
		children: [
			{ path: "", element: <Home /> },
			{ path: "/profile/:id", element: <Profile /> },
			{ path: "/create", element: <CreatePost /> },
			{ path: "/post/:id", element: <Post /> },
		],
	},
	{
		path: "/login",
		element: (
			<PublicRoute>
				<Login />
			</PublicRoute>
		),
	},
]);
