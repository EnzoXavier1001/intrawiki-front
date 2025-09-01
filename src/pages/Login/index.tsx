import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import * as z from "zod";
import ilustrationImg from "../../assets/Illustration.svg";
import { useAuth } from "../../hooks/useAuth";

const UserSchema = z.object({
	email: z.email({
		error: "E-mail inválido",
	}),
	password: z
		.string()
		.nonempty("Senha é obrigatória")
		.min(8, "Senha deve conter no mínimo 8 caracteres"),
});

export type UserInput = z.infer<typeof UserSchema>;

export const Login = () => {
	const { handleLogin } = useAuth();
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(UserSchema),
	});

	async function handleUserLogin(user: UserInput) {
		const userLogin = await handleLogin(user);

		if (userLogin) {
			toast.success("Usuário autenticado com sucesso!");
			setTimeout(() => navigate("/"), 1000);
		} else {
			toast.error("Falha ao fazer login. Verifique suas credenciais.");
		}
	}

	return (
		<div className="justify-center flex h-screen flex-col md:flex-row justify-center">
			<aside className="hidden md:flex flex-col justify-center items-center md:flex-1 bg-purple-700 text-white px-12">
				<img
					src={ilustrationImg}
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

			<main className="flex md:flex-1 items-center justify-center px-12">
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

							<button
								type="submit"
								className="w-full mt-2 bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition"
							>
								Entrar
							</button>
						</div>
					</form>

					<p className="text-sm text-center text-gray-600 mt-2">
						Não tem uma conta?{" "}
						<Link
							to="/register"
							className="text-purple-700 font-medium hover:underline"
						>
							Cadastre-se
						</Link>
					</p>
				</div>
			</main>
			<ToastContainer />
		</div>
	);
};
