import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../services/endpoint";
import type { IUser } from "../../@types/User";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { formatDate } from "../../utils/formatDate";
import { Modal } from "../../components/Modal";
import { badgeData } from "../../constants/badgeData";

export const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState<IUser>();
	const [userPosts, setUserPosts] = useState([]);
	const [activeBadge, setActiveBadge] = useState<null | {
		badge: string;
		title: string;
		text: string;
	}>(null);

	useEffect(() => {
		getUser();
		getPostsById();
	}, []);

	async function getUser() {
		try {
			const { data } = await api.get(`/users/${id}`, {
				headers: {
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2MzZTJkNWRkOTAxOGQ2NzcwZWE0MyIsImlhdCI6MTc1MzE1MDM1OX0.8s7ztwWifcBGdSn16MSah7WOFCtlLfVD6gaU2nFUFOY`,
				},
			});
			console.log(data);
			setUser(data);
		} catch (error) {
			console.error(error);
		}
	}

	async function getPostsById() {
		try {
			const { data } = await api.get("/posts/search", {
				headers: {
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2MzZTJkNWRkOTAxOGQ2NzcwZWE0MyIsImlhdCI6MTc1MzE1MDM1OX0.8s7ztwWifcBGdSn16MSah7WOFCtlLfVD6gaU2nFUFOY`,
				},
				params: { id },
			});
			setUserPosts(data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div className="bg-gray-100 min-h-screen">
				<div className="w-full h-64 bg-gradient-to-r from-indigo-600 to-purple-600" />

				<div className="bg-white -mt-40 pb-6 rounded-lg shadow-md max-w-4xl w-full mx-auto flex flex-col items-center px-4 sm:px-6">
					<img
						className="w-32 h-32 rounded-full object-cover -mt-16"
						src="https://media.licdn.com/dms/image/v2/D4D03AQEfHmk-4dEpSA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1686099424971?e=1756339200&v=beta&t=U1KRS34w_tO5DXFyL5M8_3NoHtKYlB-mFDK94myiRfw"
						alt={user?.name}
					/>
					<h1 className="mt-4 text-xl font-semibold text-center">
						{user?.name}
					</h1>
					<p className="text-gray-600 text-center my-4 mx-auto max-w-md md:max-w-xl px-2">
						{user?.biography}
					</p>
					<div className="flex items-center gap-4">
						{user?.linkedin && (
							<Link
								to={user.linkedin}
								target="_blank"
								rel="noopener noreferrer"
							>
								<LinkedinLogo size={24} />
							</Link>
						)}
						{user?.github && <GithubLogo size={24} />}
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-around mt-5 w-full border-t border-gray-300 p-3 space-y-4 sm:space-y-0">
						<div>
							<h2 className="text-center text-gray-500 font-semibold">
								Departamento
							</h2>
							<p className="text-center">E-Store</p>
						</div>
						<div>
							<h2 className="text-center text-gray-500 font-semibold">Cargo</h2>
							<p className="text-center">Publisher</p>
						</div>
					</div>

					{user?.badges?.length > 0 && (
						<div className="flex flex-wrap justify-center gap-4 items-center mt-4">
							{user.badges.map((badge, index) => {
								const data = badgeData[badge.badgeId];
								if (!data) return null;

								return (
									<img
										key={index}
										src={data.image}
										alt={data.title}
										className="w-[60px] cursor-pointer"
										onClick={() =>
											setActiveBadge({
												badge: data.image,
												title: data.title,
												text: data.text,
											})
										}
									/>
								);
							})}
						</div>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-6 pb-6 rounded-lg max-w-4xl w-full mx-auto px-4 sm:px-6">
					<div className="flex flex-col space-y-6">
						<div className="bg-white p-6 rounded-lg shadow">
							<h2 className="text-xl font-semibold mb-4">Hobbies</h2>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								{user?.hobbies?.map((hobby, index) => (
									<li key={index}>{hobby}</li>
								))}
							</ul>
						</div>

						<div className="bg-white p-6 rounded-lg shadow">
							<h2 className="text-xl font-semibold mb-4">Skills/Languages</h2>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								{user?.skills?.map((skill, index) => (
									<li key={index}>{skill}</li>
								))}
							</ul>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow max-w-full mx-auto">
						<h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
							Posts Recentes
						</h2>
						<ul className="space-y-6">
							{userPosts.map((post, index) => (
								<li key={index} className="border-b border-gray-200 pb-4">
									<div className="flex items-center space-x-4">
										<img
											src="https://i.pravatar.cc/40?img=3"
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
										{" "}
										<h3 className="mt-3 text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
											{post.title}
										</h3>
									</Link>

									<div className="mt-2 flex flex-wrap gap-2">
										{post.tags.map((tag, i) => (
											<span
												key={i}
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
		</>
	);
};
