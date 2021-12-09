import {
	getCurrentPos,
	getNewPosition,
	getPageHeight,
	getScrollContainerWidth,
} from "./utils/helpers";

const sections = document.querySelectorAll("section");

// Scrollbar
const scrollContainer = document.querySelector(".scroll-container");
const scrollBar = document.querySelector(".scroll-bar");
const scrollIcons = document.querySelectorAll(".scroll-icon");

// Home page
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu-link");
const illus = document.querySelector(".illustrations");
const slider = document.querySelector(".slider");
const iconWrapper = document.querySelectorAll(".icon-wrapper");
const illusIcons = document.querySelectorAll(".icon");

// Profile page
const profileTitles = document.querySelectorAll(".profile-title");
const profileTextWrappers = document.querySelectorAll(".text-wrapper");

const PAGES = ["home", "profile", "projects", "contact"];
let scrollPosition = 0;
let currentPage = 0;
let scrollTimer = null;
let isAutoScrolling = false;

// Mobile
let touchStart = 0;

const onLinkEnter = e => {
	const page = e.currentTarget.id.replace("-menu", "");
	const pos = PAGES.findIndex(val => val === page);
	const pageIcon = `${page}-icon`;

	Array.from(illusIcons).forEach(icon => {
		if (icon.classList.contains(pageIcon)) {
			slider.style.top = `${-menu.offsetHeight * pos}px`;
		}
	});
};

const onMenuLeave = () => {
	slider.style.top = 0;
};

const onMouseWheel = e => {
	if (e.deltaX) return;

	clearTimeout(scrollTimer);
	const pageHeight = getPageHeight();

	if (
		(scrollPosition <= 0 && e.deltaY < 0) ||
		e.target.classList.contains("scrollable") ||
		(scrollPosition >= pageHeight && e.deltaY > 0) ||
		isAutoScrolling
	)
		return;

	const deltaY = e.deltaY > 0 ? 150 : -150;

	scrollPosition += deltaY;

	const scrollDiff = scrollPosition % window.innerHeight;
	let duration = Math.abs(deltaY / 200);

	const isBottomBPReached = deltaY > 0 && scrollDiff > window.innerHeight / 3;
	const isUpBPReached =
		deltaY < 0 && window.innerHeight - scrollDiff > window.innerHeight / 3;

	if (isBottomBPReached || isUpBPReached) {
		if (isBottomBPReached) scrollPosition += window.innerHeight - scrollDiff;
		else if (isUpBPReached) scrollPosition -= scrollDiff;

		isAutoScrolling = true;
		setTimeout(() => {
			isAutoScrolling = false;
		}, 400);
	} else {
		scrollTimer = setTimeout(() => {
			scrollPosition =
				deltaY > 0
					? scrollPosition - scrollDiff
					: scrollPosition + window.innerHeight - scrollDiff;
			updateScrollPosition(duration * 0.8);
			updateSectionsPositions(duration * 0.8);
		}, duration * 500);
	}

	if (scrollPosition > pageHeight) scrollPosition = pageHeight;
	else if (scrollPosition < 0) scrollPosition = 0;

	updateScrollPosition(duration);
	updateSectionsPositions(duration);
};

const onTouchStart = e => {
	touchStart = e.changedTouches[0].clientY;
};

const onTouchMove = e => {
	const deltaY = e.changedTouches[0].clientY - touchStart;

	scrollPosition += deltaY > 0 ? 10 : -10;
	if (scrollPosition > getPageHeight()) scrollPosition = getPageHeight();
	if (scrollPosition < 0) scrollPosition = 0;

	let duration = 0;

	updateScrollPosition(duration);
	updateSectionsPositions(duration);
};

const onTouchEnd = e => {
	touchStart = 0;
	const scrollDiff = scrollPosition % window.innerHeight;
	const shouldGoToNextSection = scrollDiff > window.innerHeight * 0.5;

	const newPage = shouldGoToNextSection
		? Math.ceil(scrollPosition / window.innerHeight)
		: Math.floor(scrollPosition / window.innerHeight);

	scrollPosition = window.innerHeight * newPage;

	const duration = 0.8;

	updateScrollPosition(duration);
	updateSectionsPositions(duration);
};

const onMenuClick = e => {
	const page = e.target.parentNode.parentNode.id.replace("-menu", "");
	const idx = PAGES.findIndex(val => val === page);
	const pos = idx * window.innerHeight;
	const posDiff = Math.abs(idx - getCurrentPos(scrollPosition));

	const duration = 0.4 + posDiff * 0.2;
	scrollPosition = pos;

	updateScrollPosition(duration);
	updateSectionsPositions(duration);
};

const updateScrollIcons = () => {
	const iconsArr = Array.from(scrollIcons);
	currentPage = Math.floor(scrollPosition / window.innerHeight);

	iconsArr.forEach((el, i) => {
		el.classList.toggle("active", i === currentPage);
	});
};

const updateSectionsPositions = duration =>
	Array.from(sections).forEach((el, i) => {
		let newTop = getNewPosition(el, i) - scrollPosition;
		if (newTop < 0) newTop = 0;

		el.style.top = `${newTop}px`;
		el.style.transition = `top ${duration}s ease-in-out`;
	});

const updateScrollPosition = duration => {
	const scrollContainerWidth = getScrollContainerWidth(scrollContainer);

	let currentScrollPos =
		(scrollPosition / getPageHeight()) * scrollContainerWidth;

	if (currentScrollPos > scrollContainerWidth)
		currentScrollPos = scrollContainerWidth;

	const width = (currentScrollPos / scrollContainerWidth) * 100;

	scrollBar.style.width = `${width}%`;
	scrollBar.style.transitionDuration = `${duration}s`;

	updateScrollIcons();
};

const initScrollIcons = () => {
	updateScrollIcons();

	Array.from(scrollIcons).forEach((el, i) => {
		const page = el.classList[1].replace("-icon", "");
		const idx = PAGES.findIndex(val => val === page);
		const pos = idx * window.innerHeight;

		el.addEventListener("click", () => {
			const posDiff = Math.abs(idx - getCurrentPos(scrollPosition));
			const duration = (posDiff + 1) / 3;
			scrollPosition = pos;

			updateScrollIcons();
			updateScrollPosition(duration);
			updateSectionsPositions(duration);
		});
	});
};

const initProfileTitles = () => {
	const profileTitlesArr = Array.from(profileTitles);
	profileTitlesArr.forEach(el => {
		el.addEventListener("click", e => {
			profileTitles.forEach(el => el.classList.remove("active"));
			el.classList.add("active");

			Array.from(profileTextWrappers).forEach(el => {
				el.classList.remove("active");
			});

			const relatedText = document.querySelector(
				`.${Array.from(e.currentTarget.classList)[1].replace("title", "text")}`
			);

			relatedText.parentElement.classList.add("active");
		});
	});
};

const onResize = () => {
	scrollPosition = currentPage * window.innerHeight;

	updateScrollIcons();
	updateScrollPosition(0.5);
	updateSectionsPositions(0.5);
};

// Website initialization
const init = () => {
	window.scrollTo(0, 0);
	scrollPosition = 0;

	// Home menu
	// Links //
	Array.from(menuLinks).forEach(el => {
		el.addEventListener("mouseenter", onLinkEnter);
	});
	menu.addEventListener("mouseleave", onMenuLeave);
	menu.addEventListener("click", onMenuClick);

	// Slider //
	illus.style.height = `${menu.offsetHeight}px`;
	Array.from(iconWrapper).forEach(el => {
		el.style.height = `${menu.offsetHeight}px`;
	});

	// Scroll behavior
	document.addEventListener("wheel", onMouseWheel);
	document.addEventListener("touchstart", onTouchStart);
	document.addEventListener("touchmove", onTouchMove);
	document.addEventListener("touchend", onTouchEnd);

	initScrollIcons();
	initProfileTitles();

	window.addEventListener("resize", onResize);
};

init();
