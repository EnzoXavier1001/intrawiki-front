// src/constants/badgeData.ts
import topOneBadge from "../assets/badge1.png";
import rockstarBadge from "../assets/badge2.png";
import partyGoerBadge from "../assets/badge3.png";
import gymratBadge from "../assets/badge4.png";
import crushBadge from "../assets/badge5.png";
import admBadge from "../assets/badge6.png";

interface IBadge {
	title: string;
	text: string;
	image: string;
}

export const badgeData: Record<string, IBadge> = {
	rockstar: {
		title: "Rockstar Oficial",
		text: "Nota O? Você não só entregou, você deu aula! Um verdadeiro mestre na arte de brilhar onde passa.",
		image: rockstarBadge,
	},
	gymrat: {
		title: "Campeão do GymRat",
		text: "A academia abre e você já tá lá. Fecha e você ainda tá lá. Ninguém sabe se você treina ou só mora no supino.",
		image: gymratBadge,
	},
	partygoer: {
		title: "Festeiro Sem Rastro",
		text: "Chega chegando, sai sumindo. Ninguém sabe como você foi, nem como voltou. Só sabem que no rolê... você tava.",
		image: partyGoerBadge,
	},
	topone: {
		title: "Top 1 da Plataforma",
		text: "Você lidera sem esforço. O ranking existe porque você já tava no topo.",
		image: topOneBadge,
	},
	crush: {
		title: "Crush do Ano",
		text: "Você nem tenta — é natural. Posta uma foto e quebra o foco de meio time.",
		image: crushBadge,
	},
	festeiro: {
		title: "Festeiro Sem Rastro",
		text: "Última lembrança foi no karaokê. Você tava. O copo não era seu. Mas a fama é.",
		image: partyGoerBadge,
	},
	adm: {
		title: "Guardião da Wiki",
		text: "Conhece cada rota, cada regra e cada atalho. Se tá funcionando, agradeça ao ADM.",
		image: admBadge,
	},
};
