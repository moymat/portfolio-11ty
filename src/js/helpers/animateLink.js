export default function animateLink(e, onLinkLeave) {
	const { target: link } = e;
	let timeout;

	function onLinkLeave(link) {
		clearTimeout(timeout);
		link.style.left = 0;
		link.removeEventListener("mouseleave", onLinkLeave.bind(null, link));
	}

	const speed = (Math.random() * 1 + 0.5).toFixed(2);
	link.style.animationDuration = `${speed}s`;
	const delay = (Math.random() + 1) * 500;
	timeout = setTimeout(animateLink.bind(null, e), delay);
	link.addEventListener("mouseleave", onLinkLeave.bind(null, link));
}
