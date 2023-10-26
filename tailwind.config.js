/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// "./**/*.{html,css,js}",
		"./*.html",
		"./styles/*.css",
		"./styles/**/*.css",
		"./scripts/*.js",
	],
	theme: {
		extend: {
			backgroundImage: {
				/* "half-blue-white":
					"linear-gradient(180deg, hsl(217deg 91% 60%) 1%, hsl(217deg 91% 64%) 43%, hsl(217deg 91% 69%) 50%, hsl(217deg 91% 73%) 51%, hsl(217deg 91% 78%) 51%, hsl(218deg 91% 82%) 49%, hsl(218deg 91% 87%) 49%, hsl(217deg 91% 91%) 50%, hsl(217deg 91% 95%) 57%, hsl(0deg 0% 100%) 99%);", */
				"half-blue-white":
					"linear-gradient(180deg, #3b82f6 0%, #3b82f6 50%, #fff 50%, #fff 100%);",
			},
			maxWidth: {
				// "app-max-width": "1440px",
				// app: "1312px",
				/* app: "1248px",
				"app-margin": "1376px", */
				"app-margin-12": "calc(1000px + (3rem * 2))",
				"app-margin-16": "calc(1000px + (4rem * 2))",
			},
		},
	},
	plugins: [],
};
