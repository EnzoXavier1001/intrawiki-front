import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import ilustrationImg from "../../assets/Illustration.svg";

const userSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string().min(8),
	confirmPassword: z.string(),
	department: z.string(),
	role: z.string(),
	biography: z.string(),
	hobbies: z.string(),
	skills: z.string(),
});

type UserInput = z.infer<typeof userSchema>;

export const Register = () => {
	const [step, setStep] = useState<number>(1);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<UserInput>({
		resolver: zodResolver(userSchema),
	});

	function handleUserRegister(data) {
		console.log(data);
	}

	return (
		<div className="flex h-screen">
			<aside className="hidden md:flex flex-col justify-center items-center w-1/2 bg-purple-700 text-white px-12">
				<img src={ilustrationImg} alt="Ilustração" className="w-80 mb-10" />
				<h1 className="text-4xl font-bold leading-tight text-center">
					Compartilhe seu conhecimento
				</h1>
				<p className="text-lg mt-4 text-center max-w-sm opacity-90">
					Crie e compartilhe conteúdos com sua empresa.
				</p>
			</aside>

			<main className="flex flex-1 items-center justify-center p-6 bg-gray-50">
				<div className="w-full max-w-lg bg-white rounded-xl shadow p-8">
					<div className="flex items-center justify-between mb-8">
						{step === 1 && (
							<>
								<div className="flex-1 h-2 bg-purple-600 rounded-full"></div>
								<div className="flex-1 h-2 bg-gray-200 rounded-full mx-2"></div>
								<div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
							</>
						)}
						{step === 2 && (
							<>
								<div className="flex-1 h-2 bg-purple-600 rounded-full"></div>
								<div className="flex-1 h-2 bg-purple-600 rounded-full mx-2"></div>
								<div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
							</>
						)}
						{step === 3 && (
							<>
								<div className="flex-1 h-2 bg-purple-600 rounded-full"></div>
								<div className="flex-1 h-2 bg-purple-600 rounded-full mx-2"></div>
								<div className="flex-1 h-2 bg-purple-600 rounded-full"></div>
							</>
						)}
					</div>

					<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
						Criar conta
					</h2>

					<form
						className="space-y-10"
						onSubmit={handleSubmit(handleUserRegister)}
					>
						{step === 1 && (
							<section className="space-y-4">
								<h3 className="text-lg font-semibold text-gray-800">
									Informações básicas
								</h3>
								<input
									{...register("name")}
									type="text"
									placeholder="Nome"
									className="w-full px-4 py-3 border rounded-md focus:ring-2 border-gray-300 focus:ring-purple-500"
								/>
								<input
									{...register("email")}
									type="email"
									placeholder="E-mail"
									className="w-full px-4 py-3 border rounded-md focus:ring-2 border-gray-300 focus:ring-purple-500"
								/>
								<input
									{...register("password")}
									type="password"
									placeholder="Senha"
									className="w-full px-4 py-3 border rounded-md focus:ring-2 border-gray-300 focus:ring-purple-500"
								/>
								<input
									{...register("confirmPassword")}
									type="password"
									placeholder="Confirmar senha"
									className="w-full px-4 py-3 border rounded-md focus:ring-2 border-gray-300 focus:ring-purple-500"
								/>
								<select className="w-full px-4 py-3 border rounded-md focus:ring-2 border-gray-300 focus:ring-purple-500">
									<option>Selecione o setor…</option>
									<option>WPC BR</option>
									<option>RSC</option>
									<option>TI</option>
									<option>RH</option>
									<option>Financeiro</option>
								</select>
								<select className="w-full px-4 py-3 border rounded-md focus:ring-2 border-gray-300 focus:ring-purple-500">
									<option>Selecione o time…</option>
									<option>Publisher</option>
									<option>Account</option>
									<option>Design</option>
									<option>Comercial</option>
									<option>Suporte</option>
								</select>
								<div className="flex justify-end">
									<button
										onClick={() => setStep(2)}
										type="button"
										className="px-6 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800 transition"
									>
										Próximo
									</button>
								</div>
							</section>
						)}

						{step === 2 && (
							<section className="space-y-4">
								<h3 className="text-lg font-semibold text-gray-800">Perfil</h3>
								<textarea
									rows={3}
									placeholder="Bio"
									className="w-full px-4 py-3 border rounded-md focus:ring-2 border-gray-300 focus:ring-purple-500"
								/>

								<div>
									<p className="block text-sm font-medium text-gray-700 mb-1">
										Hobbies
									</p>
									<div className="flex flex-wrap gap-2 border rounded-md p-3">
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											Leitura
										</button>
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											Esportes
										</button>
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											Música
										</button>
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											Viagens
										</button>
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											Fotografia
										</button>
									</div>
								</div>

								<div>
									<p className="block text-sm font-medium text-gray-700 mb-1">
										Skills
									</p>
									<div className="flex flex-wrap gap-2 border rounded-md p-3">
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											React
										</button>
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											Node.js
										</button>
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											UI/UX
										</button>
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											Banco de Dados
										</button>
										<button
											type="button"
											className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
										>
											Gestão de Projetos
										</button>
									</div>
								</div>

								<div className="flex justify-between">
									<button
										onClick={() => setStep(1)}
										type="button"
										className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
									>
										Voltar
									</button>
									<button
										onClick={() => setStep(3)}
										type="button"
										className="px-6 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800 transition"
									>
										Próximo
									</button>
								</div>
							</section>
						)}

						{step === 3 && (
							<section className="space-y-4">
								<h3 className="text-lg font-semibold text-gray-800">Revisão</h3>
								<div className="border rounded-lg p-3 text-sm text-gray-600">
									<p>
										<strong>Nome:</strong> Enzo da Costa Xavier
									</p>
									<p>
										<strong>Email:</strong> seu@email.com
									</p>
									<p>
										<strong>Setor:</strong> Tecnologia
									</p>
									<p>
										<strong>Time:</strong> Frontend
									</p>
									<p>
										<strong>Bio:</strong> Apaixonado por tecnologia
									</p>
									<p>
										<strong>Hobbies:</strong> Leitura, Música
									</p>
									<p>
										<strong>Skills:</strong> React, UI/UX
									</p>
								</div>
								<div className="flex justify-between">
									<button
										onClick={() => setStep(2)}
										type="button"
										className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
									>
										Voltar
									</button>
									<button
										type="submit"
										className="px-6 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800 transition"
									>
										Criar conta
									</button>
								</div>
							</section>
						)}
					</form>

					<p className="text-sm text-center text-gray-500 mt-6">
						Já tem uma conta?{" "}
						<a href="/login" className="text-purple-700 hover:underline">
							Entrar
						</a>
					</p>
				</div>
			</main>
		</div>
	);
};
