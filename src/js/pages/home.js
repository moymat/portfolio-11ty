import initBtns from "../components/btns";
import setIconsHoverBehavior from "../helpers/setIconsHoverBehavior";

export default function initHome() {
	const languagesTitle = document.querySelector(".languages-title");
	const languagesList = document.querySelector(".languages-list");
	const languageItems = document.querySelectorAll(".language-item a");
	const projectImgContainer = document.querySelector(".profile-img-container");
	const hidden = document.querySelectorAll(".hidden");

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
				entry.target.id === "navbar" && console.log(entry);
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
