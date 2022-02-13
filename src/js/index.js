import { setIconsHoverBehavior } from "./helpers";

const dateFooter = document.querySelector("#date-footer");
const navLinks = document.querySelectorAll("nav a");
const languagesTitle = document.querySelector(".languages-title");
const languagesList = document.querySelector(".languages-list");
const languageItems = document.querySelectorAll(".language-item a");
const projectContents = document.querySelectorAll(".project-content");
const projectCards = document.querySelectorAll(".project-card");

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

projectContents.forEach(pc => {
	pc.addEventListener("mouseover", () => {
		pc.parentNode.classList.add("hover");
	});
	pc.addEventListener("mouseleave", () => {
		pc.parentNode.classList.remove("hover");
	});
});

const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) entry.target.classList.remove("hidden");
		});
	},
	{
		threshold: 0.15,
	}
);

projectCards.forEach(el => observer.observe(el));
