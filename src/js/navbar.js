const navbarBurger = document.querySelector(".navbar-burger");
const navbarBurgerContent = document.querySelector(".navbar-burger-content");
const burgerIcon = document.querySelector(".navbar-burger-icon");
const burgerMenuItems = document.querySelectorAll(
	".navbar-burger-menu .navbar-menu-item a"
);
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
		setTimeout(() => {
			burgerIcon.style.backgroundColor = "transparent";
			burgerIcon.classList.add("second-step");
		}, 250);
	} else {
		burgerIcon.classList.remove("second-step");
		setTimeout(() => {
			burgerIcon.style.removeProperty("background-color");
			burgerIcon.classList.remove("first-step");
		}, 250);
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
