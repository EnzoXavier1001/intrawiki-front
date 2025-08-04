import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { App } from "./App.tsx";
import { AuthProvider } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>,
);
