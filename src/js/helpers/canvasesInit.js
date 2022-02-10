export default function initCanvases(canvas) {
	const ctx = canvas.getContext("2d");
	ctx.canvas.setAttribute("width", ctx.canvas.offsetWidth);
	ctx.canvas.setAttribute("height", ctx.canvas.offsetHeight);

	const img = new Image();
	img.src = ctx.canvas.dataset.link;
	img.addEventListener("load", drawImage.bind(img, [ctx]));

	const [blueCanvas, redCanvas] = [
		createCanvas("blue", ctx),
		createCanvas("red", ctx),
	];

	const illus = canvas.parentNode;

	illus.parentNode.addEventListener("mouseover", () => {
		console.log("called");
		blueCanvas.classList.add("hover");
		redCanvas.classList.add("hover");

		illus.parentNode.addEventListener("mouseleave", () => {
			console.log("exited");
			blueCanvas.classList.remove("hover");
			redCanvas.classList.remove("hover");
		});
	});

	illus.append(blueCanvas, redCanvas);
}

function createCanvas(color, originalCtx) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	canvas.classList.add(`${color}-canvas`);
	canvas.setAttribute("width", originalCtx.canvas.offsetWidth);
	canvas.setAttribute("height", originalCtx.canvas.offsetHeight);

	const img = new Image();
	img.src = originalCtx.canvas.dataset.link;
	img.addEventListener("load", drawImage.bind(img, [ctx, color]));

	return canvas;
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
