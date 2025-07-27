import { useParams } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router";
import { api } from "../../services/endpoint";
import { useEffect, useState } from "react";

export const Post = () => {
	const { id } = useParams();
	const [post, setPost] = useState<any>(null);

	useEffect(() => {
		getPostById();
	}, []);

	async function getPostById() {
		const { data } = await api.get(`/posts/${id}`, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzcwOWU3ZDJjMjNhZDEyYWM4MzM5ZCIsImlhdCI6MTc1Mjk2MDQyOX0.pnq0Vl4wc7knOBGMXQMLnBbqSKhrZ95OcIm5PIuTuY0`, // use o seu token real
			},
		});
		setPost(data);
	}

	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900 transition mb-6"
				>
					<ArrowLeft size={18} />
					<span>Voltar para a Home</span>
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Conteúdo principal */}
					<main className="lg:col-span-8">
						<div className="bg-white rounded-lg shadow p-6">
							<h1 className="text-3xl font-bold text-gray-900 mb-4">
								{post?.title}
							</h1>

							{/* Info do autor */}
							<div className="flex items-center mb-6">
								<Link to={`/profile/${post?.author?._id}`}>
									<img
										src={post?.author?.avatarUrl || "https://i.pravatar.cc/100"}
										alt="Avatar"
										className="w-10 h-10 rounded-full object-cover mr-3"
									/>
								</Link>
								<div className="text-sm">
									<Link to={`/profile/${post?.author?._id}`}>
										<p className="text-gray-700 font-medium">
											{post?.author?.name || "Desconhecido"}
										</p>
									</Link>
									<p className="text-gray-500">
										Publicado em{" "}
										{new Date(post?.createdAt).toLocaleDateString()}
									</p>
								</div>
							</div>

							{/* Imagem */}
							{post?.thumbnail && (
								<img
									src={post.thumbnail}
									alt="Thumbnail"
									className="w-full rounded-md mb-6 max-h-[400px] object-cover"
								/>
							)}

							{/* Conteúdo */}
							<div className="prose max-w-none text-gray-800">
								{post?.content}
							</div>

							{/* Tags */}
							<div className="mt-6 flex flex-wrap gap-2">
								{post?.tags?.map((tag: string) => (
									<span
										key={tag}
										className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full"
									>
										#{tag}
									</span>
								))}
							</div>
						</div>
					</main>

					{/* Sidebar */}
					<aside className="hidden lg:block lg:col-span-4 space-y-6">
						<div className="bg-white rounded-lg shadow p-4">
							<h3 className="text-lg font-semibold mb-2">Sobre o autor</h3>
							<p className="text-sm text-gray-600">
								{post?.author?.name
									? `${post.author.name} é um desenvolvedor entusiasta que escreve sobre tecnologia.`
									: "Autor não identificado."}
							</p>
						</div>

						<div className="bg-white rounded-lg shadow p-4">
							<h3 className="text-lg font-semibold mb-2">Dicas de leitura</h3>
							<ul className="list-disc list-inside text-sm text-purple-700">
								<li>Como usar MongoDB</li>
								<li>Node + Mongoose</li>
								<li>React + Tailwind</li>
							</ul>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
};
