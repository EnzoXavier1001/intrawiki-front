import { Warning } from "@phosphor-icons/react";
import { NavLink } from "react-router";

export function ErrorPage({
	code = "404",
	message = "Página não encontrada",
	description = "A página que você procura não existe ou foi removida.",
}: {
	code?: string;
	message?: string;
	description?: string;
	onBack?: () => void;
}) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center dark:bg-zinc-900">
			<p className="text-9xl font-extrabold text-purple-600">{code}</p>

			<div className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/20">
				<Warning
					size={36}
					className="text-purple-600 dark:text-purple-400"
					aria-hidden="true"
				/>
			</div>

			<h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
				{message}
			</h1>
			<p className="mt-2 max-w-md text-zinc-700 dark:text-zinc-300">
				{description}
			</p>

			<div className="mt-6 flex flex-wrap justify-center gap-3">
				<NavLink
					to="/"
					className="rounded-lg bg-purple-600 px-4 py-2 text-white shadow hover:bg-purple-700 active:scale-[0.98] transition"
				>
					Voltar
				</NavLink>
			</div>
		</div>
	);
}
