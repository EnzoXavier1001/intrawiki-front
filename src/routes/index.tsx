import { createBrowserRouter } from "react-router";
import { DefaultLayout } from "../layouts/default";
import { ErrorPage } from "../pages/ErrorPage";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Post } from "../pages/Post";
import { CreatePost } from "../pages/Post/create";
import { Profile } from "../pages/Profile";
import { UserEdit } from "../pages/Profile/edit";
import { Register } from "../pages/Register";
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
			{ path: "/settings/", element: <UserEdit /> },
		],
	},
	{
		path: "/register",
		element: (
			<PublicRoute>
				<Register />
			</PublicRoute>
		),
	},
	{
		path: "/login",
		element: (
			<PublicRoute>
				<Login />
			</PublicRoute>
		),
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
]);
