const navbarBurger = document.querySelector(".navbar-burger");
const burgerIcon = document.querySelector(".navbar-burger-icon");
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
	link.setAttribute(
		"data-link",
		location.pathname === "/"
			? `#${link.dataset.section}`
			: `${window.location.origin}/#${link.dataset.section}`
	);
});

function toggleBurgerMenu() {
	if (!navbarBurger.classList.contains("open")) {
		burgerIcon.classList.add("first-step");
		burgerIcon.style.backgroundColor = "transparent";
		setTimeout(() => {
			burgerIcon.classList.add("second-step");
		}, 125);
	} else {
		burgerIcon.classList.remove("second-step");
		setTimeout(() => {
			burgerIcon.style.removeProperty("background-color");
			burgerIcon.classList.remove("first-step");
		}, 125);
	}
	navbarBurger.classList.toggle("open");
}

function navLinkClick(link) {
	if (!navbarBurger.classList.contains("open")) {
		toggleBurgerMenu();
	}
	window.location.href = link;
}

navbarBurger.addEventListener("click", toggleBurgerMenu);
navLinks.forEach(link => {
	link.addEventListener("click", navLinkClick.bind(null, link.dataset.link));
});
