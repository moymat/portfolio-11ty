const esbuild = require("esbuild");
const glob = require("tiny-glob");
//const { sassPlugin } = require("esbuild-sass-plugin");
const { NODE_ENV = "production" } = process.env;

const isProduction = NODE_ENV === "production";

module.exports = class {
	data() {
		return {
			permalink: false,
			eleventyExcludeFromCollections: true,
		};
	}

	async render() {
		await esbuild.build({
			entryPoints: await glob("./src/js/*.js"),
			bundle: true,
			minify: isProduction,
			outdir: "public",
			sourcemap: !isProduction,
			target: isProduction ? "es6" : "esnext",
			//plugins: [sassPlugin()],
		});
	}
};
