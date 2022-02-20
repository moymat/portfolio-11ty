import initBtns from "../components/btns";
import setIconsHoverBehavior from "../helpers/setIconsHoverBehavior";

export default function initHome() {
	const languagesTitle = document.querySelector(".languages-title");
	const languagesList = document.querySelector(".languages-list");
	const languageItems = document.querySelectorAll(".language-item a");
	const projectCards = document.querySelectorAll(".project-card");
	const projectImgContainer = document.querySelector(".profile-img-container");

	if (window.location.hash) {
		document.querySelector(window.location.hash).scrollIntoView();
	}

	initBtns();

	setIconsHoverBehavior(
		languageItems,
		languagesList,
		languagesTitle,
		"langages"
	);

	const setProfileImgHeight = () => {
		const width = +window
			.getComputedStyle(projectImgContainer)
			.width.replace("px", "");
		projectImgContainer.style.top = `-${width * 0.25}px`;
		projectImgContainer.style.height = `${width * 1.49}px`;
	};

	setProfileImgHeight();
	window.addEventListener("resize", setProfileImgHeight);

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