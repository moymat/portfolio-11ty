import animateTitle from "./animateTitle";

export default function (items, list, titleEl, title) {
	function onIconHover(color) {
		let colorBG = color.replace("rgb", "rgba");
		colorBG = color.replace(")", ", 0.2)");
		let colorBox = colorBG.replace("0.2", "0.7");

		const newTitle = this.parentNode.dataset.name;

		document.documentElement.style.setProperty("--color-bg", colorBG);
		document.documentElement.style.setProperty("--color-box", colorBox);

		animateTitle(titleEl, newTitle);
	}

	function onListLeave() {
		animateTitle(titleEl, title, true);
		list.removeEventListener("mouseleave", onListLeave);
	}

	function onListHover() {
		list.addEventListener("mouseleave", onListLeave);
	}

	list.addEventListener("mouseover", onListHover);

	items.forEach(i => {
		const color = window.getComputedStyle(i).color;
		i.style.color = "white";

		i.addEventListener("mouseover", onIconHover.bind(i, color));
	});
}
