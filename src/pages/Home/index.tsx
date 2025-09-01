import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as z from "zod";
import type { IAnnouncements } from "../../@types/Announcements";
import type { IPost } from "../../@types/Post";
import { getAnnouncements } from "../../api/announcements";
import { getPosts, searchPosts } from "../../api/post";
import { Card } from "../../components/Card";
import { Sidebar } from "../../components/Sidebar";
import { formatDate } from "../../utils/formatDate";

const SearchForm = z.object({
	search: z.string().optional(),
});

export const Home = () => {
	const { handleSubmit, register } = useForm<z.infer<typeof SearchForm>>({
		resolver: zodResolver(SearchForm),
	});
	const [posts, setPosts] = useState<IPost[]>([]);
	const [open, setOpen] = useState(false);
	const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
	const [categorySelected, setCategorySelected] = useState("Global");
	const [announcements, setAnnouncements] = useState<IAnnouncements[]>([]);

	useEffect(() => {
		Promise.all([getPosts(), getAnnouncements()])
			.then(([postsData, announcementsData]) => {
				setPosts(postsData);
				setFilteredPosts(postsData);
				setAnnouncements(announcementsData);
			})
			.catch((error) => {
				console.error("Erro ao buscar dados:", error);
			});
	}, []);

	const onSubmit = async (data: z.infer<typeof SearchForm>) => {
		const title = data.search || "";

		const result = await searchPosts("", title);
		setFilteredPosts(result);
	};

	useEffect(() => {
		const showModal = JSON.parse(localStorage.getItem("showModal")!);

		if (showModal) {
			localStorage.removeItem("showModal");
			setTimeout(() => {
				toast.success("Usuário logado com sucesso!");
			}, 300);
		}
	}, []);

	async function handleSearchByCategory(category: string) {
		try {
			if (category === "Global") {
				setFilteredPosts(posts);
				setCategorySelected("Global");
				return;
			}

			const data = await searchPosts(category);
			setFilteredPosts(data);
			setCategorySelected(category);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-12 gap-6">
					<Sidebar
						handleSearchByCategory={handleSearchByCategory}
						categorySelected={categorySelected}
					/>

					<main className="col-span-12 lg:col-span-7">
						<div className="flex items-center bg-white rounded-lg shadow px-3 py-2 mb-5">
							<MagnifyingGlassIcon size={22} className="text-gray-400 mr-2" />
							<form onSubmit={handleSubmit(onSubmit)} className="w-full">
								<input
									type="text"
									placeholder="Digite algo e pressione Enter para pesquisar..."
									{...register("search")}
									className="w-full outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 rounded-lg px-3 py-2 transition"
								/>
							</form>
						</div>

						<div className="space-y-4">
							{filteredPosts.length > 0 ? (
								filteredPosts?.map((post) => (
									<Card key={post._id} post={post} />
								))
							) : (
								<div className="flex flex-col items-center justify-center py-12 text-center">
									<div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-7 w-7 text-purple-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>

									<h3 className="mt-4 text-lg font-bold text-purple-700 dark:text-purple-400">
										Nenhum post na categoria {categorySelected}
									</h3>

									<p className="mt-1 text-sm font-medium text-purple-600 dark:text-purple-400">
										Escolha outra categoria para continuar explorando.
									</p>
								</div>
							)}
						</div>
					</main>

					<aside className="hidden lg:block lg:col-span-3 space-y-6">
						<aside className="hidden lg:block lg:col-span-3 space-y-6">
							<div className="bg-white p-4 rounded-lg shadow">
								<h2 className="text-lg font-semibold mb-4">
									Usuários mais populares
								</h2>
								<ul className="space-y-3">
									<li className="flex items-center justify-between">
										<div className="flex items-center">
											<img
												src="https://i.pravatar.cc/30"
												alt="User"
												className="w-8 h-8 rounded-full mr-2"
											/>
											<span className="font-medium text-gray-800">
												Nimra Corrigan
											</span>
										</div>
										<span className="text-sm text-gray-600">10 posts</span>
									</li>
									<li className="flex items-center justify-between">
										<div className="flex items-center">
											<img
												src="https://i.pravatar.cc/30?img=2"
												alt="User"
												className="w-8 h-8 rounded-full mr-2"
											/>
											<span className="font-medium text-gray-800">
												Lucas Silva
											</span>
										</div>
										<span className="text-sm text-gray-600">7 posts</span>
									</li>
									<li className="flex items-center justify-between">
										<div className="flex items-center">
											<img
												src="https://i.pravatar.cc/30?img=3"
												alt="User"
												className="w-8 h-8 rounded-full mr-2"
											/>
											<span className="font-medium text-gray-800">
												Bruna Rocha
											</span>
										</div>
										<span className="text-sm text-gray-600">5 posts</span>
									</li>
								</ul>
							</div>
						</aside>

						<div className="bg-white p-4 rounded-lg shadow">
							<h2 className="text-lg font-semibold mb-4">Próximos Eventos</h2>
							<ul className="space-y-3">
								{announcements.map((announcement) => (
									<li
										key={announcement.title}
										className="flex justify-between items-center hover:bg-gray-100 rounded px-2 py-1"
									>
										<div>
											<p className="text-gray-800 font-medium">
												{announcement.title}
											</p>
											<p className="text-sm text-gray-500">
												{formatDate(announcement.eventDate)}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</aside>
				</div>
			</div>
			<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
				{open && (
					<div className="flex flex-col items-end gap-2 animate-fade-in">
						<a
							href="https://github.com/EnzoXavier1001/intrawiki-front/pulls"
							target="_blank"
							rel="noopener"
							className="bg-white border shadow px-4 py-2 rounded-lg text-sm text-gray-800 hover:bg-gray-100 transition"
						>
							🐙 Sugerir melhoria (GitHub)
						</a>
						<a
							href="https://forms.gle/seu-form"
							target="_blank"
							rel="noopener"
							className="bg-white border shadow px-4 py-2 rounded-lg text-sm text-gray-800 hover:bg-gray-100 transition"
						>
							💬 Enviar sugestão
						</a>
					</div>
				)}

				<button
					onClick={() => setOpen(!open)}
					className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition text-sm"
					type="button"
				>
					{open ? "Fechar ×" : "💡 Contribua"}
				</button>
			</div>
			<ToastContainer autoClose={5000} />
		</div>
	);
};
