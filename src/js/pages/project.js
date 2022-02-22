import initBtns from "../components/btns";
import setIconsHoverBehavior from "../helpers/setIconsHoverBehavior";

export default function initProject() {
	const stackList = document.querySelector(".stack-list");
	const stackTitle = document.querySelector(".project-stack .info-title");
	const items = document.querySelectorAll(".stack-item a");
	const hidden = document.querySelectorAll(".hidden:not(.project-content)");
	const projectDescription = document.querySelector(".project-content");

	initBtns();

	setIconsHoverBehavior(items, stackList, stackTitle, "technologies");

	const entriesCb = entries =>
		entries.forEach(entry => {
			if (entry.isIntersecting || entry.boundingClientRect.top < 0)
				entry.target.classList.remove("hidden");
		});

	const observer = new IntersectionObserver(entriesCb, {
		threshold: 0.5,
	});

	const descriptionObserver = new IntersectionObserver(entriesCb, {
		rootMargin: "-80px 0px",
	});

	setTimeout(() => {
		hidden.forEach(el => observer.observe(el));
		descriptionObserver.observe(projectDescription);
	}, 50);
}
