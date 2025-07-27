import { useState } from "react";
import { Link } from "react-router";

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-white px-6 py-4 shadow">
			<div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
				<div className="flex items-center justify-between">
					<Link className="text-gray-800 text-xl font-bold md:text-2xl" to="/">
						Cheil
					</Link>

					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="text-gray-800 hover:text-gray-600 focus:outline-none md:hidden"
					>
						<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
							<title id="svgTitle">Ícone menu hambúrguer</title>
							<path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
						</svg>
					</button>
				</div>

				<div
					className={`${
						isOpen ? "block" : "hidden"
					} mt-4 md:mt-0 md:flex md:items-center`}
				>
					<Link
						to="/"
						className="block my-1 md:my-0 text-gray-800 hover:text-blue-500 md:mx-4"
					>
						Home
					</Link>
					<Link
						to="/eventos"
						className="block my-1 md:my-0 text-gray-800 hover:text-blue-500 md:mx-4"
					>
						Eventos
					</Link>
					<Link
						to="/sobre"
						className="block my-1 md:my-0 text-gray-800 hover:text-blue-500 md:mx-4"
					>
						Sobre
					</Link>
				</div>
			</div>
		</nav>
	);
};
