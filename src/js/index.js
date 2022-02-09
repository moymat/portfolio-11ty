import { animateLink, setIconsHoverBehavior } from "./helpers";

const dateFooter = document.querySelector("#date-footer");
const navLinks = document.querySelectorAll("nav a");
const glitchyLinks = document.querySelectorAll(".glitchy-link");
const languagesTitle = document.querySelector(".languages-title");
const languagesList = document.querySelector(".languages-list");
const languageItems = document.querySelectorAll(".language-item i");

glitchyLinks.forEach(link => {
	link.addEventListener("mouseover", animateLink);
});

navLinks.forEach(link => {
	link.setAttribute(
		"href",
		location.pathname === "/"
			? `#${link.dataset.section}`
			: `${window.location.origin}/#${link.dataset.section}`
	);
});

dateFooter.innerHTML = new Date(Date.now()).getFullYear();

setIconsHoverBehavior(languageItems, languagesList, languagesTitle, "langages");
