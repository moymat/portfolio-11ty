const pluginSass = require("eleventy-plugin-sass");

module.exports = eleventyConfig => {
	eleventyConfig.addWatchTarget("./src/js/");
	eleventyConfig.addPlugin(pluginSass, {
		//outputDir: "public/styles",
		remap: true,
	});
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
