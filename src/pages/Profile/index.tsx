import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { IPost } from "../../@types/Post";
import type { IUser } from "../../@types/User";
import { getPostByUserId } from "../../api/post";
import { getUserById } from "../../api/user";
import { Modal } from "../../components/Modal";
import { badgeData } from "../../constants/badgeData";
import { formatDate } from "../../utils/formatDate";

export const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState<IUser>();
	const [userPosts, setUserPosts] = useState<IPost[]>([]);
	const [activeBadge, setActiveBadge] = useState<null | {
		badge: string;
		title: string;
		text: string;
	}>(null);

	useEffect(() => {
		if (!id) return;

		Promise.all([getUserById(id), getPostByUserId(id)])
			.then(([userData, postData]) => {
				setUser(userData);
				setUserPosts(postData);
			})
			.catch((error) => {
				console.error("Erro ao buscar dados:", error);
			});
	}, [id]);

	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="w-full h-64 bg-gradient-to-r from-indigo-600 to-purple-600" />

			<div className="bg-white -mt-40 pb-6 rounded-lg shadow-md max-w-4xl w-full mx-auto flex flex-col items-center px-4 sm:px-6">
				<img
					className="w-32 h-32 rounded-full object-cover -mt-16"
					src={user?.avatarUrl}
					alt={user?.name}
				/>
				<h1 className="mt-4 text-xl font-semibold text-center">{user?.name}</h1>
				<p className="text-gray-600 text-center my-4 mx-auto max-w-md md:max-w-xl px-2">
					{user?.biography}
				</p>

				<div className="flex items-center gap-4">
					{user?.linkedin && (
						<Link to={user?.linkedin} target="_blank" rel="noopener noreferrer">
							<LinkedinLogoIcon size={24} />
						</Link>
					)}
					{user?.github && (
						<Link to={user?.github} target="_blank" rel="noopener noreferrer">
							<GithubLogoIcon size={24} />
						</Link>
					)}
				</div>

				<div className="w-full grid grid-cols-1 sm:grid-cols-3 text-center gap-6 mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
					<div>
						<h3 className="text-sm text-gray-500 font-semibold">
							Departamento
						</h3>
						<p className="text-base text-gray-800 font-medium mt-1">WPC BR</p>
					</div>
					<div>
						<h3 className="text-sm text-gray-500 font-semibold">Cargo</h3>
						<p className="text-base text-gray-800 font-medium mt-1">
							Publisher
						</p>
					</div>
					<div>
						<h3 className="text-sm text-gray-500 font-semibold">Badges</h3>
						<div className="flex justify-center gap-3 mt-2 flex-wrap">
							{user?.badges?.map((badge) => {
								const data = badgeData[badge.badgeId];
								if (!data) return null;

								return (
									<button
										type="button"
										key={badge.badgeId}
										onClick={() =>
											setActiveBadge({
												badge: data.image,
												title: data.title,
												text: data.text,
											})
										}
									>
										<img
											src={data.image}
											alt={data.title}
											className="w-[40px] h-[40px] cursor-pointer hover:scale-105 transition"
										/>
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 max-w-4xl w-full mx-auto mt-6 pb-8">
				<div className="flex flex-col space-y-6">
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-xl font-semibold mb-4">Hobbies</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-700">
							{user?.hobbies?.map((hobby) => (
								<li key={hobby}>{hobby}</li>
							))}
						</ul>
					</div>

					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-xl font-semibold mb-4">Skills/Languages</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-700">
							{user?.skills?.map((skill) => (
								<li key={skill}>{skill}</li>
							))}
						</ul>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
						Posts Recentes
					</h2>
					<ul className="space-y-6">
						{userPosts.map((post) => (
							<li key={post._id} className="border-b border-gray-200 pb-4">
								<div className="flex items-center space-x-4">
									<img
										src={post.author.avatarUrl}
										alt="Foto do usuário"
										className="w-10 h-10 rounded-full object-cover"
									/>
									<div>
										<p className="font-medium text-gray-900">
											{post.author.name}
										</p>
										<p className="text-sm text-gray-500 capitalize">
											Publicado em {formatDate(post.createdAt)}
										</p>
									</div>
								</div>
								<Link to={`/post/${post._id}`}>
									<h3 className="mt-3 text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
										{post.title}
									</h3>
								</Link>

								<div className="mt-2 flex flex-wrap gap-2">
									{post.tags.map((tag) => (
										<span
											key={tag}
											className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full"
										>
											#{tag}
										</span>
									))}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			{activeBadge && (
				<Modal
					badge={activeBadge.badge}
					onCloseModal={() => setActiveBadge(null)}
					title={activeBadge.title}
					text={activeBadge.text}
				/>
			)}
		</div>
	);
};
