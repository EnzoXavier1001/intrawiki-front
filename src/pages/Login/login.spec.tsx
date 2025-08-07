import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Login } from ".";
import { AuthProvider } from "../../contexts/UserContext";
import { Home } from "../Home";

describe("LoginPage", () => {
	it("should render error message if email and password are empty", async () => {
		render(
			<MemoryRouter>
				<Login />
			</MemoryRouter>,
		);

		const button = screen.getByText("Entrar");
		fireEvent.click(button);

		expect(await screen.findByText("E-mail é obrigatório")).toBeInTheDocument();
		expect(await screen.findByText("Senha é obrigatória")).toBeInTheDocument();
	});

	it("sign in with wrong credentials", async () => {
		render(
			<AuthProvider>
				<MemoryRouter>
					<Login />
				</MemoryRouter>
			</AuthProvider>,
		);

		const email = screen.getByPlaceholderText("Email");
		const password = screen.getByPlaceholderText("Senha");

		fireEvent.change(email, { target: { value: "teste@example.com" } });
		fireEvent.change(password, { target: { value: "minhaSenha123" } });

		const button = screen.getByText("Entrar");
		fireEvent.click(button);

		const toast = await screen.findByText(
			"Falha ao fazer login. Verifique suas credenciais.",
		);

		await expect(toast).toBeInTheDocument();
	});

	it("signs in sucessfuly if email and password match", async () => {
		render(
			<AuthProvider>
				<MemoryRouter initialEntries={["/login"]}>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</MemoryRouter>
			</AuthProvider>,
		);

		const email = screen.getByPlaceholderText("Email");
		const password = screen.getByPlaceholderText("Senha");

		fireEvent.change(email, { target: { value: "enzo.x@cheil.com" } });
		fireEvent.change(password, { target: { value: "minhaSenha123" } });

		const button = screen.getByText("Entrar");
		fireEvent.click(button);

		const title = await screen.getByText("Usuário logado com sucesso!");
		expect(title).toBeInTheDocument();
	});
});
