import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

export const privateRoutes = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/profile/:id", element: <Profile /> },
]);
