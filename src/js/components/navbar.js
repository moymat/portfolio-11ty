const navbarBurger = document.querySelector(".navbar-burger");
const burgerIcon = document.querySelector(".navbar-burger-icon");

export default function toggleBurgerMenu() {
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

navbarBurger.addEventListener("click", toggleBurgerMenu);
