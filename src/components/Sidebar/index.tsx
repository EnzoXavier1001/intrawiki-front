import {
	AppWindow,
	Cpu,
	Globe,
	ShoppingCart,
	UsersFour,
} from "@phosphor-icons/react";

type SidebarProps = {
	categorySelected: string;
	handleSearchByCategory: (category: string) => void;
};

const categoryList = [
	{
		icon: <Globe size={22} />,
		text: "Global",
	},
	{
		icon: <Cpu size={22} />,
		text: "TI",
	},
	{
		icon: <ShoppingCart size={22} />,
		text: "VTEX",
	},
	{
		icon: <AppWindow size={22} />,
		text: "AEM",
	},
	{
		icon: <UsersFour size={22} />,
		text: "RH",
	},
];

export const Sidebar = ({
	categorySelected,
	handleSearchByCategory,
}: SidebarProps) => {
	return (
		<aside className="hidden lg:flex lg:col-span-2 flex-col space-y-2">
			{categoryList.map((category, index) => (
				<button
					key={category[index]}
					className={`${categorySelected === category.text ? " bg-purple-100 font-bold text-purple-700" : ""} cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-purple-100 hover:font-bold hover:text-purple-700 transition`}
					type="button"
					onClick={() => handleSearchByCategory(category.text)}
				>
					{category.icon}
					<span>{category.text}</span>
				</button>
			))}
		</aside>
	);
};
