import { zodResolver } from "@hookform/resolvers/zod";
import { type KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "../../hooks/useAuth";

export const userSchema = z.object({
	name: z.string().min(2, "Nome muito curto"),
	password: z.string().optional(),
	biography: z.string().optional(),
	avatarUrl: z.string().url("URL do avatar inválida").optional(),
	linkedin: z.string().url("URL do LinkedIn inválida").optional(),
	github: z.string().url("URL do GitHub inválida").optional(),
	skills: z.array(z.string()).optional(),
	hobbies: z.array(z.string()).optional(),
});

export type UserData = z.infer<typeof userSchema>;

export const UserEdit = () => {
	const { user } = useAuth();

	const [skillInput, setSkillInput] = useState("");
	const [hobbyInput, setHobbyInput] = useState("");

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm<UserData>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: user?.name,
			biography: user?.biography,
			avatarUrl: user?.avatarUrl,
			linkedin: user?.linkedin,
			github: user?.github,
			skills: user?.skills || [],
			hobbies: user?.hobbies || [],
		},
	});

	function onSubmitUser(data: UserData) {
		console.log(data);
	}

	function handleAddToArray(
		e: KeyboardEvent<HTMLInputElement>,
		type: "skills" | "hobbies",
		inputValue: string,
		setInputValue: (val: string) => void,
	) {
		if (e.key === "Enter" && inputValue.trim()) {
			e.preventDefault();
			const current = getValues(type) || [];

			if (current.includes(inputValue.trim())) return;

			setValue(type, [...current, inputValue.trim()]);
			setInputValue("");
		}
	}

	function handleRemoveFromArray(type: "skills" | "hobbies", item: string) {
		const current = getValues(type) || [];
		const updated = current.filter((i: string) => i !== item);
		setValue(type, updated);
	}

	const watchedSkills = watch("skills");
	const watchedHobbies = watch("hobbies");

	return (
		<div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded shadow">
			<h1 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h1>

			<form className="space-y-6" onSubmit={handleSubmit(onSubmitUser)}>
				<div className="flex flex-col items-center gap-4">
					<img
						className="w-24 h-24 rounded-full object-cover"
						src={user?.avatarUrl}
						alt="Avatar"
					/>
					<input
						type="text"
						placeholder="URL do Avatar"
						{...register("avatarUrl")}
						className="w-full md:w-1/2 rounded-md border border-gray-200 px-4 py-2 text-sm"
					/>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
					<div className="flex flex-col gap-1">
						<p className="text-sm font-medium text-gray-700">Nome</p>
						<input
							type="text"
							placeholder="Nome"
							{...register("name")}
							className="rounded-md border border-gray-200 px-4 py-2 text-sm"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<p className="text-sm font-medium text-gray-700">Senha</p>
						<input
							type="password"
							placeholder="******"
							{...register("password")}
							className="rounded-md border border-gray-200 px-4 py-2 text-sm"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<p className="text-sm font-medium text-gray-700">LinkedIn</p>
						<input
							type="text"
							placeholder="https://linkedin.com/in/seuuser"
							{...register("linkedin")}
							className="rounded-md border border-gray-200 px-4 py-2 text-sm"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<p className="text-sm font-medium text-gray-700">GitHub</p>
						<input
							type="text"
							placeholder="https://github.com/seuuser"
							{...register("github")}
							className="rounded-md border border-gray-200 px-4 py-2 text-sm"
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<p className="text-sm font-medium text-gray-700">Biografia</p>
					<textarea
						placeholder="Conte um pouco sobre você"
						{...register("biography")}
						className="rounded-md border border-gray-200 px-4 py-2 text-sm min-h-[100px]"
					/>
				</div>

				<div>
					<p className="text-sm font-medium text-gray-700 mb-1">Habilidades</p>
					<div className="flex flex-wrap gap-2 mb-2">
						{watchedSkills?.map((skill) => (
							<span
								key={skill}
								className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
							>
								{skill}
								<button
									type="button"
									onClick={() => handleRemoveFromArray("skills", skill)}
									className="text-purple-700 hover:text-purple-900"
								>
									×
								</button>
							</span>
						))}
					</div>
					<input
						type="text"
						placeholder="Adicionar habilidade"
						className="w-full border border-gray-200 px-3 py-2 rounded"
						value={skillInput}
						onChange={(e) => setSkillInput(e.target.value)}
						onKeyDown={(e) =>
							handleAddToArray(e, "skills", skillInput, setSkillInput)
						}
					/>
				</div>

				<div>
					<p className="text-sm font-medium text-gray-700 mb-1">Hobbies</p>
					<div className="flex flex-wrap gap-2 mb-2">
						{watchedHobbies?.map((hobby) => (
							<span
								key={hobby}
								className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
							>
								{hobby}
								<button
									type="button"
									onClick={() => handleRemoveFromArray("hobbies", hobby)}
									className="text-blue-700 hover:text-blue-900"
								>
									×
								</button>
							</span>
						))}
					</div>
					<input
						type="text"
						placeholder="Adicionar hobby"
						className="w-full border border-gray-200 px-3 py-2 rounded"
						value={hobbyInput}
						onChange={(e) => setHobbyInput(e.target.value)}
						onKeyDown={(e) =>
							handleAddToArray(e, "hobbies", hobbyInput, setHobbyInput)
						}
					/>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						className="cursor-pointer bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
					>
						Salvar
					</button>
				</div>
			</form>
		</div>
	);
};
