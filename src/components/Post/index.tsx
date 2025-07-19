import { Link } from "react-router";
import type { IPost } from "../../@types/Post";
import { formatDate } from "../../utils/formatDate";

interface IPostCardProps {
	post: IPost;
}

export const Post = ({ post }: IPostCardProps) => {
	return (
		<div className="mt-6">
			<div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
				<div className="flex justify-between items-center">
					<span className="font-light text-gray-600 capitalize">
						{formatDate(post.createdAt)}
					</span>
					<span className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded">
						{post.category}
					</span>
				</div>
				<div className="mt-2">
					<h1 className="text-2xl text-gray-700 font-bold hover:underline">
						{post.title}
					</h1>
					<p className="mt-2 text-gray-600">{post.content}</p>
				</div>
				<div className="flex justify-between items-center mt-4">
					<Link
						to={`/post/${post._id}`}
						className="text-blue-500 hover:underline"
					>
						Saiba mais
					</Link>
					<div>
						<a href={`/profile/${post.author}`} className="flex items-center">
							<img
								src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
								alt="avatar"
								className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
							/>
							<h1 className="text-gray-700 font-bold hover:underline">
								Alex John
							</h1>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
