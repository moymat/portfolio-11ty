import setIconsHoverBehavior from "./helpers/setIconsHoverBehavior";

const dateFooter = document.querySelector("#date-footer");
const navbar = document.querySelector("#navbar");
const navMenu = document.querySelector(".navbar-menu");
const navLinks = document.querySelectorAll("nav a");
const languagesTitle = document.querySelector(".languages-title");
const languagesList = document.querySelector(".languages-list");
const languageItems = document.querySelectorAll(".language-item i");

const symbols = ["&", "<", ">", "@", "#", "+", "_", "$", "^"];
let linkTimeout;
let secondLinkTimeout;

const createSymbols = (min, max) => {
	for (let i = min; i < max; i++) {
		symbols.push(String.fromCharCode(i));
	}
};

createSymbols(97, 123);

function onNavLinkLeave(text) {
	this.innerHTML = text;
	clearTimeout(linkTimeout);
	clearTimeout(secondLinkTimeout);
	this.removeEventListener("mouseleave", onNavLinkLeave.bind(this, text));
}

const animateLink = (link, text, original) => {
	const textArr = text.split("");
	const itt = Math.min(
		Math.floor(Math.random() * textArr.length),
		Math.round(textArr.length / 4)
	);
	const idx = new Set([...textArr.keys()]);
	const newTextArr = [...textArr];

	for (let i = 0; i <= itt; i++) {
		const newChar = symbols[Math.floor(Math.random() * symbols.length)];
		const id = Math.floor(Math.random() * idx.size);
		idx.delete(id);

		newTextArr[id] = newChar;
	}

	link.innerHTML = newTextArr.join("");

	linkTimeout = setTimeout(() => {
		link.innerHTML = original;
		secondLinkTimeout = setTimeout(
			() => animateLink(link, text, original),
			Math.floor((Math.random() + 2) * 100)
		);
	}, Math.floor((Math.random() + 1) * 100));
};

const onNavLinkHover = ({ target: link }) => {
	const text = link.innerHTML;
	animateLink(link, text, text);
	link.addEventListener("mouseleave", onNavLinkLeave.bind(link, [text]));
};

navLinks.forEach(l => {
	l.setAttribute(
		"href",
		location.pathname === "/"
			? `#${l.dataset.section}`
			: `${window.location.origin}/#${l.dataset.section}`
	);
	l.addEventListener("mouseover", onNavLinkHover);
});

navMenu.style.left = `calc(${window.getComputedStyle(navbar).width} - ${
	window.getComputedStyle(navMenu).width
})`;

dateFooter.innerHTML = new Date(Date.now()).getFullYear();

setIconsHoverBehavior(languageItems, languagesList, languagesTitle, "langages");
