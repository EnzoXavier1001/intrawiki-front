import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Login } from ".";

describe("LoginPage", () => {
	it("should render error message if email and password are empty", async () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>,
		);

		const button = screen.getByText("Entrar");
		fireEvent.click(button);

		expect(await screen.findByText("E-mail é obrigatório")).toBeInTheDocument();
		expect(await screen.findByText("Senha é obrigatória")).toBeInTheDocument();
	});
});
