import { setIconsHoverBehavior } from "./helpers";

const dateFooter = document.querySelector("#date-footer");
const languagesTitle = document.querySelector(".languages-title");
const languagesList = document.querySelector(".languages-list");
const languageItems = document.querySelectorAll(".language-item a");
const projectContents = document.querySelectorAll(".project-content");
const projectCards = document.querySelectorAll(".project-card");
const projectImgContainer = document.querySelector(".profile-img-container");

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

const setProfileImgHeight = () => {
	const width = +window
		.getComputedStyle(projectImgContainer)
		.width.replace("px", "");
	console.log(width);
	projectImgContainer.style.top = `-${width * 0.25}px`;
	projectImgContainer.style.height = `${width * 1.49}px`;
};

setProfileImgHeight();
window.addEventListener("resize", setProfileImgHeight);

projectCards.forEach(el => observer.observe(el));
