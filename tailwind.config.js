// tailwind.config.js
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // ajuste pro seu projeto
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
