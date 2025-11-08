import type { TargetElement } from "split-type";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { createRef } from "react";
import SplitType from "split-type";

type useAnimation = {
	type: "byChar" | "byWord" | "fadeIn";
	delay?: number | "pageLoading";
};

export function useAnimation({ type, delay }: useAnimation) {
	const ref = createRef<
		Element &
			HTMLDivElement &
			HTMLHeadingElement &
			HTMLButtonElement &
			HTMLAnchorElement
	>();
	const animationDelay = 0;
	const delayVal =
		(delay == "pageLoading" && animationDelay + 0.5) ||
		(!!delay && (delay as number)) ||
		0;

	useGSAP(() => {
		if (!["byChar", "byWord"].includes(type) || !ref.current) return;

		const splitText = new SplitType(ref.current as TargetElement, {
			types: "chars,words",
		});

		gsap.set(splitText.words, {
			overflow: "hidden",
			verticalAlign: "top",
		});

		if (type == "byWord") {
			const tl = gsap.timeline({
				delay: delayVal,
				scrollTrigger:
					(!delay && {
						trigger: ref.current,
						start: "top 80%",
						end: "bottom 70%",
						//invalidateOnRefresh: true,
					}) ||
					null,
			});

			splitText.words?.length &&
				splitText.words.map((word, idx) => {
					tl.from(
						word.querySelectorAll(".char"),
						{
							y: "100%",
							delay: idx * 0.02,
						},
						"",
					);
				});

			return () => {
				splitText.revert();
			};
		} else {
			gsap.from(splitText.chars, {
				y: "100%",
				stagger: 0.02,
				delay: delayVal,
				scrollTrigger:
					(!delay && {
						trigger: ref.current,
						start: "top 80%",
						end: "bottom 60%",
						//invalidateOnRefresh: true,
					}) ||
					null,
			});

			return () => {
				splitText.revert();
			};
		}
	}, []);

	useGSAP(() => {
		if (type != "fadeIn" || !ref.current) return;

		gsap.from(ref.current, {
			opacity: 0,
			delay: delayVal,
			scrollTrigger:
				(!delay && {
					trigger: ref.current,
					start: "top 80%",
					end: "bottom 50%",
					//invalidateOnRefresh: true,
				}) ||
				null,
		});
	}, []);

	return ref;
}
