import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";

export const privateRoutes = createBrowserRouter([
	{ path: "/", element: <Home /> },
]);
