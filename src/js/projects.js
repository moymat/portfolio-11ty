const icons = document.querySelectorAll(".tech-item");

const onMouseEnter = e => {
	const icon = Array.from(e.target.childNodes).filter(node =>
		node.classList?.contains("stack-icon")
	)[0];

	icon.classList.add("colored");
	const color = window.getComputedStyle(icon).color;
	icon.style.color = "#e5dada";
	e.target.style.backgroundColor = color;
	e.target.style.color = color;
};

const onMouseLeave = e => {
	const icon = Array.from(e.target.childNodes).filter(node =>
		node.classList?.contains("stack-icon")
	)[0];

	icon.classList.remove("colored");
	icon.style.color = null;
	e.target.style.backgroundColor = null;
	e.target.style.color = null;
};

const init = () => {
	Array.from(icons).forEach(icon => {
		icon.addEventListener("mouseenter", onMouseEnter);
		icon.addEventListener("mouseleave", onMouseLeave);
	});
};

init();
