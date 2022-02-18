async function switchLetters(titleEl, next, leave) {
	titleEl.innerHTML = next;
	titleEl.dataset.content = next;
	const speed = leave ? 1 : 2;
	return await new Promise(resolve =>
		setTimeout(resolve, Math.round(Math.random() + speed) * 50)
	);
}

async function animateTitle(titleEl, next, list, leave = false) {
	let current = titleEl.innerHTML;
	titleEl.classList.add("hover");

	const idx = new Set([...current.split("").keys()]);
	let newText = new Array(current.length)
		.fill(" ")
		.map((_, i) => (i > next.length ? " " : next[i]))
		.join("");

	const currentThird = Math.floor(current.length / 3);

	for (let itt = 0; itt < 2; itt++) {
		const idsToModify = [];
		if (itt < 2) {
			for (let i = 0; i < currentThird; i++) {
				const id = Math.floor(Math.random() * idx.size);
				const idToModify = [...idx][id];
				idsToModify.push(idToModify);
				idx.delete(idToModify);
			}
		}

		current = current
			.split("")
			.map((l, i) => {
				if (idsToModify.includes(i)) {
					return newText[i];
				} else {
					return l;
				}
			})
			.join("");

		await switchLetters(titleEl, current, leave);
	}

	await switchLetters(titleEl, next, leave);
}

export default animateTitle;
