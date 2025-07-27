import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownRenderer = ({ content }: { content: string }) => {
	return (
		<div className="prose max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-lg prose-pre:bg-gray-900 prose-pre:text-white">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	);
};
