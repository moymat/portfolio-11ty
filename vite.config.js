const { defineConfig } = require("vite");
const glob = require("fast-glob");
const path = require("path");

const files = glob
	.sync(path.resolve(__dirname, "src/vite") + "/**/*.html")
	.reduce((acc, cur) => {
		let name = cur
			.replace(path.join(__dirname) + "/src/vite/", "")
			.replace("/index.html", "");

		if (name === "") name = "home";

		acc[name] = cur;
		return acc;
	}, {});

console.log("files vite", files);

module.exports = defineConfig({
	root: "./src/vite",
	clearScreen: false,
	build: {
		outDir: "../../public",
		rollupOptions: {
			input: files,
		},
	},
});
