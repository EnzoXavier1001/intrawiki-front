import { useState } from "react";
import { Link } from "react-router";
import { Bell } from "@phosphor-icons/react";

export const Header = () => {
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	const user = {
		name: "Joana",
		avatar: "https://i.pravatar.cc/40?img=5",
	};

	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link to="/" className="text-2xl font-bold text-gray-900">
					Cheil
				</Link>

				<nav className="hidden md:flex gap-8 text-[16px] font-medium text-gray-700">
					<Link to="/" className="hover:text-blue-600">
						Home
					</Link>
					<Link to="/eventos" className="hover:text-blue-600">
						Eventos
					</Link>
					<Link to="/sobre" className="hover:text-blue-600">
						Sobre
					</Link>
				</nav>

				<div className="flex items-center gap-5">
					<Link
						to="/criar"
						className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 text-[15px] font-semibold transition"
					>
						Criar Post
					</Link>

					<div className="relative">
						<button
							onClick={() => setShowProfileMenu((prev) => !prev)}
							type="button"
							className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-gray-300 transition"
						>
							<img
								src={user.avatar}
								alt={user.name}
								className="w-full h-full object-cover"
							/>
						</button>

						{showProfileMenu && (
							<div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md z-50">
								<ul className="py-2 text-[15px] text-gray-700">
									<li>
										<Link
											to="/profile"
											className="block px-4 py-2 hover:bg-gray-100"
										>
											Perfil
										</Link>
									</li>
									<li>
										<Link
											to="/configuracoes"
											className="block px-4 py-2 hover:bg-gray-100"
										>
											Configurações
										</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
