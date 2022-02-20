import toggleBurgerMenu from "./navbar";
import initProject from "../pages/project";
import initHome from "../pages/home";

const overlay = document.querySelector(".overlay");
const main = document.querySelector(".main-container");
const html = document.querySelector("html");
const navbarBurger = document.querySelector(".navbar-burger");
const navLinks = document.querySelectorAll(".nav-link");

const pageChanged = new CustomEvent("pagechanged");
const pagesCache = {};

async function loadPage(url) {
	if (pagesCache[url]) {
		return Promise.resolve(pagesCache[url]);
	}

	const text = await (
		await fetch(url, {
			method: "GET",
		})
	).text();

	pagesCache[url] = text;

	return text;
}

async function initNewPage(link) {
	overlay.classList.remove(`visible-left`);
	overlay.classList.remove(`visible-right`);
	overlay.style.removeProperty("transition");

	html.style.scrollBehavior = "auto";

	const url = window.location.origin + link;
	history.pushState(null, null, url);

	const text = await loadPage(url);
	const wrapper = document.createElement("div");
	wrapper.innerHTML = text;

	setTimeout(() => {
		main.innerHTML = "";
		main.appendChild(wrapper.querySelector(".page-content"));
		overlay.classList.add(`visible-${getDirection()}`);
		window.dispatchEvent(pageChanged);
	}, 1100);
}

function isHome() {
	return window.location.pathname === "/";
}

function getDirection() {
	return isHome() ? "right" : "left";
}

async function onNavLinkClick() {
	html.style.scrollBehavior =
		window.location.pathname === "/" ? "smooth" : "auto";

	if (!navbarBurger.classList.contains("open")) {
		toggleBurgerMenu();
	}

	const link = "#" + this.dataset.section;

	if (!isHome()) {
		initNewPage(link);
	} else {
		history.replaceState(null, null, link);
		document.querySelector(link).scrollIntoView();
	}
}

function initPage() {
	const projectCards = document.querySelectorAll(".project-card");
	const goBackLink = document.querySelector(".go-back-link");

	projectCards.forEach(card => {
		card.addEventListener("click", initNewPage.bind(null, card.dataset.link));
	});

	goBackLink?.addEventListener("click", initNewPage.bind(null, "/"));
}

async function onPopstate() {
	const text = await loadPage(window.location.href);
	const wrapper = document.createElement("div");

	overlay.style.transition = "none";

	wrapper.innerHTML = text;
	main.innerHTML = "";
	main.appendChild(wrapper.querySelector(".page-content"));
	overlay.classList.add(`visible-${getDirection()}`);

	window.dispatchEvent(pageChanged);
}

function onPageLoad() {
	overlay.classList.add(`visible-${getDirection()}`);
	isHome() ? initHome() : initProject();
	initPage();
}

function onPageChanged() {
	isHome() ? initHome() : initProject();
	initPage();
}

navLinks.forEach(link => {
	link.addEventListener("click", onNavLinkClick.bind(link));
});

window.addEventListener("load", onPageLoad);
window.addEventListener("pagechanged", onPageChanged);
window.addEventListener("popstate", onPopstate);
