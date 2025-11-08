import gsap from "gsap";

const scrollTo = (el: string, duration: number = 1) => {
	const blockRef = document.querySelector(el);

	if (!blockRef) return;

	const { top, height } = blockRef.getBoundingClientRect();
	const endY = top + window.scrollY + height;

	gsap.to(window, {
		scrollTo: endY,
		duration: duration,
	});
};

export default scrollTo;
