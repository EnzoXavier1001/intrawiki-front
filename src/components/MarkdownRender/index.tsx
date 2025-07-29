import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownRenderer = ({ content }: { content: string }) => {
	return (
		<div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-purple-600 hover:prose-a:text-purple-800 prose-img:rounded-md prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-1 prose-code:rounded prose-code:text-pink-600 prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	);
};
