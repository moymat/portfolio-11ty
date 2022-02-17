import setIconsHoverBehavior from "./helpers/setIconsHoverBehavior";

const stackList = document.querySelector(".stack-list");
const stackTitle = document.querySelector(".project-stack .info-title");
const items = document.querySelectorAll(".stack-item a");
const projectCards = document.querySelectorAll(".project-card");

setIconsHoverBehavior(items, stackList, stackTitle, "technologies");

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
