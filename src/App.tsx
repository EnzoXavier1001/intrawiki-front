import { RouterProvider } from "react-router";
import { routes } from "./routes/";

export const App = () => {
	return <RouterProvider router={routes} />;
};
