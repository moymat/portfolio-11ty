const pluginSass = require("eleventy-plugin-sass");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = eleventyConfig => {
	eleventyConfig.addWatchTarget("./src/js/");
	eleventyConfig.addPlugin(pluginSass, {
		//outputDir: "public/styles",
		remap: true,
		watch: ["**/*.scss"],
	});
	eleventyConfig.setLibrary(
		"md",
		markdownIt({ html: true }).use(markdownItAttrs)
	);
	eleventyConfig.addPassthroughCopy("./src/assets");
	eleventyConfig.setDataDeepMerge(true);

	return {
		templateFormats: ["njk", "md", "11ty.js"],
		dir: {
			input: "src",
			output: "public",
		},
	};
};
