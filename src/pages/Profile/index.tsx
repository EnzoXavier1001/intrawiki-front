import { Link, useParams } from "react-router";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { api } from "../../services/endpoint";
import type { IUser } from "../../@types/User";
import { Cake, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { formatDate } from "../../utils/formatDate";

export const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState<IUser>();

	useEffect(() => {
		getUser();
	}, []);

	async function getUser() {
		try {
			const { data } = await api.get(`/users/${id}`, {
				headers: {
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`,
				},
			});

			console.log(data.createdAt);

			setUser(data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<Header />
			<div className="bg-gray-100 min-h-screen">
				<div className="bg-black w-full h-64"></div>

				<div className="bg-white -mt-40 pb-6 rounded-lg shadow-md max-w-4xl w-full mx-auto flex flex-col items-center">
					<img
						className="w-32 h-32 rounded-full object-cover -mt-16"
						src="https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F2410234%2Fe32c3997-3183-4f88-8c74-922955a238b9.jpg"
						alt={user?.name}
					/>
					<h1 className="mt-4 text-xl font-semibold">{user?.name}</h1>
					<p class="text-gray-600 text-center my-4 mx-auto max-w-md md:max-w-xl">
						{user?.biography}
					</p>
					<div className="flex items-center gap-4">
						<Link to={user?.linkedin} target="_href">
							<LinkedinLogo size={24} />
						</Link>
						<GithubLogo size={24} />
					</div>
					<div className="flex items-center mt-5 w-full justify-around border-t border-gray-300 p-3">
						<div className="flex-column">
							<h2 className="text-center text-gray-500 font-semibold">
								Departamento
							</h2>
							<p>Platform - Global Team</p>
						</div>
						<div className="flex-column">
							<h2 className="text-center text-gray-500 font-semibold">Cargo</h2>
							<p>Publisher</p>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 mt-5 gap-4 pb-6 rounded-lg max-w-4xl w-full mx-auto">
					{/* Coluna esquerda - hobbies + habilidades */}
					<div className="flex flex-col space-y-4">
						{/* Hobbies */}
						<div className="bg-white p-6 rounded-lg shadow">
							<h2 className="text-xl font-semibold mb-4">Hobbies</h2>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								<li>Fotografia</li>
								<li>Leitura</li>
								<li>Jardinagem</li>
								<li>Esportes</li>
							</ul>
						</div>

						{/* Habilidades */}
						<div className="bg-white p-6 rounded-lg shadow">
							<h2 className="text-xl font-semibold mb-4">Skills/Languages</h2>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								<li>JavaScript</li>
								<li>Java</li>
								<li>React</li>
								<li>TypeScript</li>
								<li>C++</li>
								<li>Go</li>
							</ul>
						</div>
					</div>

					{/* Coluna direita - posts */}
					<div className="bg-white p-6 rounded-lg shadow max-w-xl w-full mx-auto">
						{" "}
						<h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
							Posts Recentes
						</h2>
						<ul className="space-y-6">
							<li className="border-b border-gray-200 pb-4">
								<div className="flex items-center space-x-4">
									<img
										src="https://i.pravatar.cc/40?img=3"
										alt="Foto do usuário"
										className="w-10 h-10 rounded-full object-cover"
									/>
									<div>
										<p className="font-medium text-gray-900">Enzo Costa</p>
										<p className="text-sm text-gray-500">
											Publicado em 15/07/2025
										</p>
									</div>
								</div>
								<h3 className="mt-3 text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
									Como fazer registro de bundles no AEM
								</h3>
								<div className="mt-2 flex flex-wrap gap-2">
									<span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
										#bundle
									</span>
									<span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
										#AEM
									</span>
									<span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
										#osgi
									</span>
								</div>
							</li>

							<li className="border-b border-gray-200 pb-4">
								<div className="flex items-center space-x-4">
									<img
										src="https://i.pravatar.cc/40?img=12"
										alt="Foto do usuário"
										className="w-10 h-10 rounded-full object-cover"
									/>
									<div>
										<p className="font-medium text-gray-900">Ana Silva</p>
										<p className="text-sm text-gray-500">
											Publicado em 12/07/2025
										</p>
									</div>
								</div>
								<h3 className="mt-3 text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
									Como editar o FAQ de suporte no AEM
								</h3>
								<div className="mt-2 flex flex-wrap gap-2">
									<span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
										#faq
									</span>
									<span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
										#suporte
									</span>
									<span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
										#AEM
									</span>
								</div>
							</li>

							{/* Adicione mais posts aqui */}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
