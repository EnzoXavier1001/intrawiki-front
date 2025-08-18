import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import remarkGfm from "remark-gfm";
import type { IPost } from "../../@types/Post";
import { formatDate } from "../../utils/formatDate";

interface ICardProps {
	post: IPost;
}

export const Card = ({ post }: ICardProps) => {
	const { author } = post;

	return (
		<div className="mt-6">
			<div className="max-w-4xl px-8 py-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
				<div className="flex justify-between items-center">
					<span className="font-light text-gray-500 text-sm capitalize">
						{formatDate(post.createdAt)}
					</span>
					<span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold rounded-full shadow-sm">
						{post.category}
					</span>
				</div>

				{/* Título e Conteúdo */}
				<div className="mt-4">
					<h1 className="text-2xl text-gray-800 font-extrabold hover:underline hover:text-indigo-600 transition-colors">
						{post.title}
					</h1>
					<div className="mt-3 text-gray-600 prose max-w-none line-clamp-3">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{post.content}
						</ReactMarkdown>
					</div>
				</div>

				{/* Rodapé com autor */}
				<div className="flex justify-between items-center mt-6">
					<Link
						to={`/post/${post._id}`}
						className="text-indigo-600 font-medium hover:underline"
					>
						Saiba mais →
					</Link>
					<div>
						<Link to={`/profile/${author?._id}`} className="flex items-center">
							<img
								src={author?.avatarUrl}
								alt="avatar"
								className="mx-3 w-10 h-10 object-cover rounded-full hidden sm:block border border-gray-200"
							/>
							<h1 className="text-gray-700 font-semibold hover:underline">
								{author?.name}
							</h1>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
