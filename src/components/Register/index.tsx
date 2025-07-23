import { useState } from "react";

export const Register = () => {
	const [step, setStep] = useState<number>(1);

	function handleNextStep() {
		setStep((prev) => prev + 1);
	}

	function handlePrevStep() {
		setStep((prev) => prev - 1);
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
			{step === 1 && (
				<div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md">
					{/* Barra de Progresso */}
					<div className="flex items-center justify-between mb-8">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-indigo-600 h-2 rounded-full"
								style={{ width: "33%" }}
							></div>
						</div>
						<span className="ml-3 text-gray-600 text-sm">Etapa 1 de 3</span>
					</div>

					{/* Etapa 1 - Informações Básicas */}
					<form className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Informações Básicas
						</h2>
						<div>
							<label className="block text-gray-700 font-medium mb-1">
								Nome
							</label>
							<input
								type="text"
								placeholder="Digite seu nome"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
							/>
						</div>
						<div>
							<label className="block text-gray-700 font-medium mb-1">
								Email
							</label>
							<input
								type="email"
								placeholder="Digite seu email"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
							/>
						</div>
						<div>
							<label className="block text-gray-700 font-medium mb-1">
								Senha
							</label>
							<input
								type="password"
								placeholder="Digite sua senha"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
							/>
						</div>
						{/* Campo Departamento */}
						<div>
							<label className="block text-gray-700 font-medium mb-1">
								Departamento
							</label>
							<select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400">
								<option value="" disabled>
									Selecione...
								</option>
								<option value="TI">TI</option>
								<option value="VTEX">VTEX</option>
								<option value="AEM">AEM</option>
								<option value="RH">RH</option>
							</select>
						</div>
						<div className="flex justify-end">
							<button
								onClick={() => handleNextStep()}
								type="button"
								className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
							>
								Próximo
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Etapa 2 - Perfil e Redes */}
			{step === 2 && (
				<div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md mt-8">
					<div className="flex items-center justify-between mb-8">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-indigo-600 h-2 rounded-full"
								style={{ width: "66%" }}
							></div>
						</div>
						<span className="ml-3 text-gray-600 text-sm">Etapa 2 de 3</span>
					</div>
					<form className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">Perfil</h2>
						<div>
							<label className="block text-gray-700 font-medium mb-1">
								Hobbies
							</label>
							<div className="flex flex-wrap gap-3">
								{["Fotografia", "Leitura", "Esportes", "Viagens"].map(
									(hobby) => (
										<label
											key={hobby}
											className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-200"
										>
											<input type="checkbox" className="accent-indigo-500" />{" "}
											{hobby}
										</label>
									),
								)}
							</div>
						</div>
						<div>
							<label className="block text-gray-700 font-medium mb-1">
								LinkedIn
							</label>
							<input
								type="url"
								placeholder="Link do LinkedIn"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
							/>
						</div>
						<div>
							<label className="block text-gray-700 font-medium mb-1">
								GitHub
							</label>
							<input
								type="url"
								placeholder="Link do GitHub"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
							/>
						</div>
						<div className="flex justify-between">
							<button
								onClick={() => handlePrevStep()}
								type="button"
								className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
							>
								Voltar
							</button>
							<button
								type="button"
								onClick={() => handleNextStep()}
								className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
							>
								Próximo
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Etapa 3 - Foto e Confirmação */}
			{step === 3 && (
				<div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md mt-8">
					<div className="flex items-center justify-between mb-8">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-indigo-600 h-2 rounded-full"
								style={{ width: "100%" }}
							></div>
						</div>
						<span className="ml-3 text-gray-600 text-sm">Etapa 3 de 3</span>
					</div>
					<form className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Foto de Perfil
						</h2>
						<div>
							<label className="block text-gray-700 font-medium mb-2">
								Upload de Foto
							</label>
							<input
								type="file"
								className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
							/>
						</div>
						<p className="text-gray-600 text-sm">
							Confira seus dados antes de finalizar o registro.
						</p>
						<div className="flex justify-between">
							<button
								onClick={() => handlePrevStep()}
								type="button"
								className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
							>
								Voltar
							</button>
							<button
								type="submit"
								className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
							>
								Finalizar
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
