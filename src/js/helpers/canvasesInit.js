export default function initCanvases(image) {
	const canvases = image.parentNode.querySelectorAll("canvas");

	image.addEventListener("load", () => {
		canvases.forEach(canvas => {
			const color = canvas.classList[0].replace("-canvas", "");

			const ctx = canvas.getContext("2d");

			const img = new Image();
			img.src = image.src;
			img.addEventListener("load", drawImage.bind(img, [ctx, color]), false);

			drawImage.call(img, [ctx, color]);
		});
	});

	image.parentNode.parentNode.addEventListener("mouseover", () => {
		canvases.forEach(canvas => {
			canvas.classList.add("hover");
		});
		image.parentNode.parentNode.addEventListener("mouseleave", () => {
			canvases.forEach(canvas => {
				canvas.classList.remove("hover");
			});
		});
	});
}

function colorImage(ctx, color) {
	const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	let newImgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	let pixels = newImgData.data;

	for (let i = 0; i < pixels.length; i += 4) {
		let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

		pixels[i] = !color || color === "red" ? lightness : 0;
		pixels[i + 1] = !color || color === "green" ? lightness : 0;
		pixels[i + 2] = !color || color === "blue" ? lightness : 0;
	}

	ctx.putImageData(newImgData, 0, 0);
	return imgData;
}

function drawImage([ctx, color]) {
	// get the scale
	const scale = Math.max(
		ctx.canvas.width / this.width,
		ctx.canvas.height / this.height
	);
	// get the top left position of the image
	const x = ctx.canvas.width / 2 - (this.width / 2) * scale;
	const y = ctx.canvas.height / 2 - (this.height / 2) * scale;

	//ctx.globalAlpha = color ? 0.2 : 1;
	ctx.drawImage(this, x, y, this.width * scale, this.height * scale);

	colorImage(ctx, color);
}
