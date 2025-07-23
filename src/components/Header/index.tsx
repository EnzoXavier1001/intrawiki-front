import { Link } from "react-router";

export const Header = () => {
	return (
		<nav className="bg-white px-6 py-4 shadow">
			<div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
				<div className="flex justify-between items-center">
					<div>
						<Link
							className="text-gray-800 text-xl font-bold md:text-2xl"
							to="/"
						>
							Cheil
						</Link>
					</div>
					<div>
						<button
							type="button"
							className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
						>
							<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
								<path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
							</svg>
						</button>
					</div>
				</div>
				<div className="md:flex flex-col md:flex-row md:-mx-4 hidden">
					<Link
						to="/"
						className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
					>
						Home
					</Link>
					<a
						href="#"
						className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
					>
						Eventos
					</a>
					<a
						href="#"
						className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
					>
						About us
					</a>
				</div>
			</div>
		</nav>
	);
};
