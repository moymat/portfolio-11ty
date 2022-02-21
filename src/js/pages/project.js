import initBtns from "../components/btns";
import setIconsHoverBehavior from "../helpers/setIconsHoverBehavior";

export default function initProject() {
	const stackList = document.querySelector(".stack-list");
	const stackTitle = document.querySelector(".project-stack .info-title");
	const items = document.querySelectorAll(".stack-item a");
	const hidden = document.querySelectorAll(".hidden");

	initBtns();

	setIconsHoverBehavior(items, stackList, stackTitle, "technologies");

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting || entry.boundingClientRect.top < 0)
					entry.target.classList.remove("hidden");
			});
		},
		{
			threshold: 0.5,
		}
	);

	setTimeout(() => {
		hidden.forEach(el => observer.observe(el));
	}, 50);
}
