import toggleBurgerMenu from "./navbar";
import initProject from "../pages/project";
import initHome from "../pages/home";

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

function animatePages(oldPage, newPage, hash) {
	newPage.classList.add("hidden");
	main.appendChild(newPage);

	const direction = !newPage.classList.contains("project-container")
		? "right"
		: "left";

	oldPage.classList.add("hidden", `hidden-${direction}`);

	setTimeout(() => {
		newPage.classList.remove("hidden");
		main.removeChild(oldPage);
		hash ? document.querySelector(hash).scrollIntoView() : window.scroll(0, 0);
		window.dispatchEvent(pageChanged);
	}, 750);
}

async function initNewPage(link) {
	const isHashLink = link.startsWith("#");

	html.style.scrollBehavior = "auto";

	history.pushState(null, null, window.location.origin + link);

	const text = await loadPage(
		isHashLink ? window.location.origin : window.location.origin + link
	);
	const wrapper = document.createElement("div");
	wrapper.innerHTML = text;

	const newPage = wrapper.querySelector(".page-content");
	const oldPage = document.querySelector(".page-content");

	isHashLink
		? animatePages(oldPage, newPage, link)
		: animatePages(oldPage, newPage);
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
	const goBackLink = document.querySelectorAll(".go-back-link");

	projectCards.forEach(card => {
		card.addEventListener("click", initNewPage.bind(null, card.dataset.link));
	});

	goBackLink?.forEach(link => {
		link.addEventListener("click", initNewPage.bind(null, "/"));
	});
}

async function onPopstate() {
	const text = await loadPage(window.location.href);
	const wrapper = document.createElement("div");

	wrapper.innerHTML = text;
	main.innerHTML = "";
	main.appendChild(wrapper.querySelector(".page-content"));

	window.dispatchEvent(pageChanged);
}

function onPageLoad() {
	isHome() ? initHome() : initProject();
	initPage();
}

navLinks.forEach(link => {
	link.addEventListener("click", onNavLinkClick.bind(link));
});

window.addEventListener("load", onPageLoad);
window.addEventListener("pagechanged", onPageLoad);
window.addEventListener("popstate", onPopstate);
