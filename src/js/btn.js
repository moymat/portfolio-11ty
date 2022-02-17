const btns = document.querySelectorAll(".page-btn");

function onBtnLeave(e) {
	e.target.removeEventListener("mousemove", moveGradient);
	e.target.removeEventListener("mouseleave", onBtnLeave);
}

function moveGradient(e) {
	const {
		offsetX,
		target: { clientWidth },
	} = e;

	const x = Math.abs((100 / clientWidth) * offsetX).toFixed(2);

	e.target.style.setProperty("--after-right", `-${x}%`);
}

function onBtnHover(e) {
	moveGradient(e);
	e.target.addEventListener("mousemove", moveGradient);
	e.target.removeEventListener("mouseleave", onBtnLeave);
}

btns.forEach(btn => btn.addEventListener("mouseover", onBtnHover));
