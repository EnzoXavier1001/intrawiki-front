import { zodResolver } from "@hookform/resolvers/zod";
import MarkdownIt from "markdown-it";
import { type KeyboardEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MdEditor from "react-markdown-editor-lite";
import { z } from "zod";
import "react-markdown-editor-lite/lib/index.css";
import { ToastContainer, toast } from "react-toastify";
import { createPost } from "../../api/post";

const mdParser = new MarkdownIt();

const categories = [
	"PVI",
	"AEM Author",
	"AEM Target",
	"AEM Launch",
	"Design",
	"TI",
	"RH",
	"VTEX",
];

const postSchema = z.object({
	title: z.string().min(3, "Título muito curto"),
	category: z.string().min(1, "Selecione uma categoria"),
	content: z.string().min(10, "Conteúdo muito curto"),
	tags: z.array(z.string()).max(4, "Máximo 4 tags"),
	status: z.enum(["published", "draft"]),
});

type PostData = z.infer<typeof postSchema>;

export const CreatePost = () => {
	const [tab, setTab] = useState<"edit" | "preview">("edit");
	const [tagInput, setTagInput] = useState("");

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		formState: { errors },
	} = useForm<PostData>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: "",
			category: "",
			content: "",
			status: "draft",
			tags: [],
		},
	});

	const onSubmit = async (data: PostData) => {
		const storedUser = localStorage.getItem("user");

		if (!storedUser) {
			toast.error("Usuário não autenticado");
			return;
		}

		const user = JSON.parse(storedUser);
		const authorId = user._id;

		try {
			const response = await createPost({
				...data,
				author: authorId,
			});

			if (response) {
				toast.success("Post criado com sucesso!");
				reset();
			}
		} catch (err) {
			toast.error("Erro ao criar o post.");
		}
	};

	function handleAddTag(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && tagInput.trim()) {
			e.preventDefault();
			const currentTags = getValues("tags");
			if (currentTags.includes(tagInput.trim())) return;
			if (currentTags.length >= 4) return;
			const updated = [...currentTags, tagInput.trim()];
			setValue("tags", updated);
			setTagInput("");
		}
	}

	function handleRemoveTag(tagToRemove: string) {
		const updated = getValues("tags").filter((tag) => tag !== tagToRemove);
		setValue("tags", updated);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Criar Novo Post</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div>
					<label htmlFor="title" className="block font-medium mb-1">
						Título
					</label>
					<input
						id="title"
						{...register("title")}
						className="w-full border border-gray-300 rounded px-3 py-2"
					/>
					{errors.title && (
						<p className="text-red-600 text-sm">{errors.title.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="category" className="block font-medium mb-1">
						Categoria
					</label>
					<select
						id="category"
						{...register("category")}
						className="w-full border border-gray-300 rounded px-3 py-2"
					>
						<option value="">Selecione uma categoria</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="text-red-600 text-sm">{errors.category.message}</p>
					)}
				</div>

				<div>
					<p className="block font-medium mb-1">Tags</p>
					<div className="flex flex-wrap gap-2 mb-2">
						{getValues("tags").map((tag) => (
							<span
								key={tag}
								className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
							>
								{tag}
								<button
									type="button"
									onClick={() => handleRemoveTag(tag)}
									className="text-blue-600 hover:text-blue-800"
								>
									×
								</button>
							</span>
						))}
					</div>
					<input
						type="text"
						value={tagInput}
						onChange={(e) => setTagInput(e.target.value)}
						onKeyDown={handleAddTag}
						placeholder="Digite e pressione Enter"
						className="w-full border border-gray-300 rounded px-3 py-2"
					/>
					{errors.tags && (
						<p className="text-red-600 text-sm">{errors.tags.message}</p>
					)}
				</div>

				<div>
					<div className="flex border-b mb-2">
						<button
							type="button"
							className={`px-4 py-2 font-medium ${
								tab === "edit"
									? "border-b-2 border-blue-600 text-blue-600"
									: "text-gray-500"
							}`}
							onClick={() => setTab("edit")}
						>
							Editar
						</button>
						<button
							type="button"
							className={`px-4 py-2 font-medium ${
								tab === "preview"
									? "border-b-2 border-blue-600 text-blue-600"
									: "text-gray-500"
							}`}
							onClick={() => setTab("preview")}
						>
							Preview
						</button>
					</div>

					<Controller
						name="content"
						control={control}
						render={({ field }) =>
							tab === "edit" ? (
								<MdEditor
									style={{ height: "400px" }}
									value={field.value}
									onChange={({ text }) => field.onChange(text)}
									renderHTML={(text) => mdParser.render(text)}
									view={{ menu: true, md: true, html: false }}
								/>
							) : (
								<div className="border rounded p-4 bg-white min-h-[400px] prose max-w-none">
									<div
										dangerouslySetInnerHTML={{
											__html: mdParser.render(field.value),
										}}
									/>
								</div>
							)
						}
					/>
					{errors.content && (
						<p className="text-red-600 text-sm">{errors.content.message}</p>
					)}
				</div>

				<div className="flex gap-4">
					<button
						type="submit"
						onClick={() => setValue("status", "published")}
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
					>
						Publicar
					</button>

					<button
						type="submit"
						onClick={() => setValue("status", "draft")}
						className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
					>
						Salvar como rascunho
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};
