import initBtns from "../components/btns";
import setIconsHoverBehavior from "../helpers/setIconsHoverBehavior";

export default function initProject() {
	const stackList = document.querySelector(".stack-list");
	const stackTitle = document.querySelector(".project-stack .info-title");
	const items = document.querySelectorAll(".stack-item a");
	const projectCards = document.querySelectorAll(".project-card");

	initBtns();

	setIconsHoverBehavior(items, stackList, stackTitle, "technologies");

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) entry.target.classList.remove("hidden");
			});
		},
		{
			threshold: 0.65,
		}
	);

	projectCards.forEach(el => observer.observe(el));
}
