import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
	const currentDate = parseISO(date);

	return format(currentDate, "MMM d, yyyy", {
		locale: ptBR,
	});
}
