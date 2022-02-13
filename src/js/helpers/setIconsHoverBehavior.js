import animateTitle from "./animateTitle";

export default function (items, list, titleEl, title) {
	function onIconHover() {
		animateTitle(titleEl, this.dataset.name);
	}

	function onListLeave() {
		animateTitle(titleEl, title, true);
		list.removeEventListener("mouseleave", onListLeave);
		titleEl.classList.remove("hover");
	}

	function onListHover() {
		list.addEventListener("mouseleave", onListLeave);
	}

	list.addEventListener("mouseover", onListHover);

	items.forEach(i => {
		const color = window
			.getComputedStyle(i)
			.color.replace("rgb", "rgba")
			.replace(")", ", 0.7)");

		i.style.color = "white";
		i.style.setProperty("--color-box", color);

		i.addEventListener("mouseover", onIconHover.bind(i));
	});
}
