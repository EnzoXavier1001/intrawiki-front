import { RouterProvider } from "react-router";
import { privateRoutes } from "./routes/privateRoutes";

export const App = () => {
	return <RouterProvider router={privateRoutes}></RouterProvider>;
};
