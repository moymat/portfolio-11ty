const fs = require("fs");
const path = require("path");
const pluginSass = require("eleventy-plugin-sass");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const Image = require("@11ty/eleventy-img");

(async () => {
	const getImgs = dir => {
		let arr = [];
		const files = fs.readdirSync(dir);
		files.forEach(file => {
			const f = path.resolve(dir, file);
			const stat = fs.statSync(f);
			stat.isDirectory()
				? arr.push(...getImgs(dir + "/" + [file]))
				: arr.push(dir + "/" + file);
		});
		return arr;
	};

	const imgFiles = getImgs("./src/assets/img").filter(
		url => url.match(/([^\/|\.]+)\/?$/)[0] !== "svg"
	);

	await Promise.all(
		imgFiles.map(async url => {
			const outputDir =
				"public/" + url.replace(/([^\/]+)\/?$/, "").replace("./src/", "");
			return await Image(url, {
				formats: ["webp"],
				filenameFormat: (_, src, width, format) => {
					const extension = path.extname(src);
					const name = path.basename(src, extension);

					return `${name}.${format}`;
				},
				outputDir,
			});
		})
	);
})();

const projectOrder = ["Bristol", "Adopt", "Digital Project", "Portfolio"];

module.exports = eleventyConfig => {
	eleventyConfig.addWatchTarget("./src/js/");
	eleventyConfig.addPlugin(pluginSass, {
		remap: true,
	});
	eleventyConfig.addPlugin(embedYouTube, {
		embedClass: "youtube-video",
		lite: true,
	});
	eleventyConfig.setLibrary(
		"md",
		markdownIt({ html: true }).use(markdownItAttrs)
	);
	eleventyConfig.addPassthroughCopy("./src/assets/**/*.(svg|webp|pdf)");
	eleventyConfig.addCollection("projectsSorted", collectionApi => {
		return collectionApi
			.getFilteredByTag("project")
			.sort((a, b) =>
				projectOrder.findIndex(v => b.data.title === v) -
					projectOrder.findIndex(v => a.data.title === v) <
				0
					? 1
					: -1
			);
	});
	eleventyConfig.setDataDeepMerge(true);

	return {
		templateFormats: ["njk", "md", "11ty.js"],
		dir: {
			input: "src",
			output: "public",
		},
	};
};
