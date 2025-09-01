import { Crepe } from "@milkdown/crepe";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { getPostById } from "../../api/post";

import "./styles.css";

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

import type { IPost } from "../../@types/Post";

export const Post = () => {
	const { id } = useParams();
	const [post, setPost] = useState<IPost | null>(null);
	const crepeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!id) return;

		getPostById(id).then((data) => {
			setPost(data);
			console.log(data);
		});
	}, [id]);

	useEffect(() => {
		if (!post?.content || !crepeRef.current) return;

		let crepeInstance: Crepe;

		(async () => {
			crepeInstance = new Crepe({
				root: crepeRef.current!,
				defaultValue: post.content,
			});

			await crepeInstance.create();
			crepeInstance.setReadonly(true);
		})();

		return () => {
			crepeInstance?.destroy?.();
		};
	}, [post?.content]);

	if (!post) {
		return (
			<div className="text-center text-gray-600 p-10">Carregando post...</div>
		);
	}

	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900 transition mb-6"
				>
					<ArrowCircleLeft size={32} />
					<span>Voltar para a Home</span>
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
					<main className="lg:col-span-9">
						<div className="bg-white rounded-lg shadow p-6">
							<h1 className="text-3xl font-bold text-gray-900 mb-4">
								{post.title}
							</h1>

							{post.author && (
								<div className="flex items-center mb-6">
									<Link to={`/profile/${post.author._id}`}>
										<img
											src={post.author.avatarUrl || "https://i.pravatar.cc/100"}
											alt="Avatar"
											className="w-10 h-10 rounded-full object-cover mr-3"
										/>
									</Link>
									<div className="text-sm">
										<Link to={`/profile/${post.author._id}`}>
											<div className="flex items-center gap-2 text-sm">
												<p className="text-gray-700 font-medium">
													{post.author.name}
												</p>
												<span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs font-semibold">
													{post.category}
												</span>
											</div>
										</Link>
										<p className="text-gray-500">
											Publicado em{" "}
											{new Date(post.createdAt).toLocaleDateString()}
										</p>
									</div>
								</div>
							)}

							{post.thumbnail && (
								<img
									src={post.thumbnail}
									alt="Thumbnail"
									className="w-full rounded-md mb-6 max-h-[400px] object-cover"
								/>
							)}

							<div
								ref={crepeRef}
								className="
											mb-6
											[&_.crepe-frame]:pl-0
											[&_.crepe-side]:hidden
											[&_.milkdown-block-plus-button]:hidden
											[&_.ProseMirror]:px-2
											[&_.ProseMirror]:py-1
											[&_.ProseMirror]:text-gray-900
											[&_.ProseMirror]:leading-relaxed
											[&_.ProseMirror]:text-base
										"
							/>

							<div className="mt-6 flex flex-wrap gap-2">
								{post.tags?.map((tag) => (
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

					<aside className="hidden lg:block lg:col-span-3 space-y-6">
						<div className="bg-white rounded-lg shadow p-4">
							<h3 className="text-lg font-semibold mb-2">Sobre o autor</h3>
							<p className="text-sm text-gray-600">
								{post.author?.name
									? `${post.author.name} ${post.author.biography}`
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
