export interface IPost {
	_id: string;
	status: "draft" | "published" | "archived";
	title: string;
	thumbnail?: string;
	content: string;
	category:
		| "PVI"
		| "AEM Author"
		| "AEM Target"
		| "AEM Launch"
		| "Design"
		| "TI"
		| "RH"
		| "VTEX";
	tags: string[];
	author: string;
	createdAt: string;
}
