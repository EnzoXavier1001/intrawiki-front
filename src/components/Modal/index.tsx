type ModalProps = {
	badge: string;
	title: string;
	text: string;
	onCloseModal: () => void;
};

export const Modal = ({ badge, title, text, onCloseModal }: ModalProps) => {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full flex gap-6 relative">
				<button
					className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl font-bold cursor-pointer"
					onClick={onCloseModal}
					type="button"
				>
					&times;
				</button>

				<div className="flex-shrink-0">
					<img src={badge} alt="Badge" className="w-28 h-28 object-contain" />
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">{title}</h2>
					<p className="text-gray-700 mb-4">{text}</p>
					<button
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
						onClick={onCloseModal}
						type="button"
					>
						Entendi
					</button>
				</div>
			</div>
		</div>
	);
};
