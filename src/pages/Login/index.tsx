import * as z from "zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/useUser";

const UserSchema = z.object({
	email: z.string().nonempty("E-mail é obrigatório").email({
		error: "E-mail inválido",
	}),
	password: z.string().nonempty("Senha é obrigatória"),
});

export type UserInput = z.infer<typeof UserSchema>;

export const Login = () => {
	const { handleLogin } = useUser();
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(UserSchema),
	});

	async function handleUserLogin(userData: UserInput) {
		const success = await handleLogin(userData);

		console.log(success);

		if (success) {
			toast.success("Usuário autenticado com sucesso!");
			setTimeout(() => navigate("/"), 1000);
		} else {
			toast.error("Falha ao fazer login. Verifique suas credenciais.");
		}
	}
	return (
		<div className="flex h-screen">
			<aside className="flex flex-col justify-center items-center w-1/2 bg-purple-700 text-white px-12">
				<img
					src="https://undraw.co/api/illustrations/0aeb89ab-5c5e-479a-a154-3b88a27347c7"
					alt="Ilustração de compartilhamento de conhecimento"
					className="w-80 mb-10"
				/>
				<h1 className="text-4xl font-bold leading-tight text-center">
					Compartilhe seu conhecimento
				</h1>
				<p className="text-lg mt-4 text-center max-w-sm">
					Crie e compartilhe conteúdos com outros colaboradores da sua empresa.
				</p>
			</aside>

			<main className="flex flex-1 items-center justify-center">
				<div className="w-full max-w-md px-8">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
						Faça login na plataforma
					</h2>

					<form
						className="flex flex-col gap-4"
						onSubmit={handleSubmit(handleUserLogin)}
					>
						<div className="space-y-4">
							<div>
								<input
									placeholder="Email"
									className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
										errors.email
											? "border-red-500 focus:ring-red-400"
											: "border-gray-300 focus:ring-purple-500"
									}`}
									{...register("email")}
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-500">
										{errors.email.message}
									</p>
								)}
							</div>

							<div>
								<input
									type="password"
									placeholder="Senha"
									className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
										errors.password
											? "border-red-500 focus:ring-red-400"
											: "border-gray-300 focus:ring-purple-500"
									}`}
									{...register("password")}
								/>
								{errors.password && (
									<p className="mt-1 text-sm text-red-500">
										{errors.password.message}
									</p>
								)}
							</div>

							{/* Botão */}
							<button
								type="submit"
								className="w-full mt-2 bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition"
							>
								Entrar
							</button>
						</div>
					</form>

					<p className="text-sm text-center text-gray-500 mt-4">
						Esqueceu sua senha?{" "}
						{/* <a className="text-purple-600 hover:underline">Recuperar acesso</a> */}
					</p>
				</div>
			</main>
			<ToastContainer />
		</div>
	);
};
