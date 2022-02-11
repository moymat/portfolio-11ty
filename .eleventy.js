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

	const imgFiles = getImgs("./src/11ty/assets/img");

	await Promise.all(
		imgFiles.map(async url => {
			const outputDir = url.replace(/([^\/]+)\/?$/, "").replace("11ty", "vite");
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

module.exports = eleventyConfig => {
	eleventyConfig.addWatchTarget("./src/11ty/js/");
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
	eleventyConfig.addPassthroughCopy("./src/11ty/assets");
	eleventyConfig.setDataDeepMerge(true);

	return {
		templateFormats: ["njk", "md", "11ty.js"],
		dir: {
			input: "./src/11ty",
			output: "./src/vite",
		},
	};
};
