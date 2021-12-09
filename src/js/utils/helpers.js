export const getCurrentPos = scrollPosition =>
	scrollPosition
		? (scrollPosition - (scrollPosition % window.innerHeight)) /
		  window.innerHeight
		: 0;

export const getNewPosition = (el, i) => (i + 1) * el.offsetHeight;

export const getPageHeight = () => window.innerHeight * 3;

export const getScrollContainerWidth = scrollContainer =>
	+window
		.getComputedStyle(scrollContainer, null)
		.getPropertyValue("width")
		.replace("px", "");
