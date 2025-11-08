"use client";

import type { FloatingNumbers as FloatingNumbersType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import toBr from "@util/toBr";

import css from "./index.module.css";

const FloatingNumbers: React.FC<FloatingNumbersType> = ({
	subTitle,
	title,
	items,
}) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!ref.current) return;

			const q = gsap.utils.selector(ref.current);
			const itemsEl = q<HTMLElement>(`.${css.items}`)[0];
			const itemsEls = q<HTMLElement>(`.${css.item}`);
			const wrapperEl = q<HTMLElement>(`.${css.wrapper}`)[0];

			// Use matchMedia for responsive animations
			const mm = gsap.matchMedia();
			const breakPoint = 960;

			// Desktop animation
			mm.add(
				{
					isDesktop: `(min-width: ${breakPoint}px)`,
					isMobile: `(max-width: ${breakPoint - 1}px)`,
				},
				(context) => {
					if (!context.conditions) return;

					const { isDesktop, isMobile } = context.conditions;

					if (isDesktop) {
						gsap.fromTo(
							itemsEls,
							{
								rotate: () => gsap.utils.random(-6, 6),
							},
							{
								rotate: () => gsap.utils.random(-6, 6),
								yoyo: true,
								repeat: -1,
								duration: 3,
							},
						);

						gsap.set(itemsEls, {
							y: () => window.innerHeight / 2 + 50,
							x: () => (isDesktop ? "0%" : "-50%"),
						});

						ScrollTrigger.create({
							trigger: ref.current,
							start: "50% center",
							end: () => `+=${window.innerHeight}px`,
							pin: wrapperEl,
						});

						itemsEls.forEach((item) => {
							gsap.to(item, {
								y: () => (window.innerHeight / 2 + item.offsetHeight + 50) * -1,
								scrollTrigger: {
									trigger: ref.current,
									start: () =>
										`0%+=${window.innerHeight * 0.5 * gsap.utils.random(0.9, 1.1)} center`,
									end: () =>
										`100%-=${window.innerHeight * gsap.utils.random(0.1, 0.5)} center`,
									scrub: true,
								},
								ease: "none",
							});
						});
					} else {
						gsap.to(itemsEls, {
							x: () =>
								itemsEl.offsetWidth -
								itemsEls[itemsEls.length - 1].offsetLeft +
								itemsEls[0].offsetWidth * -1,
							scrollTrigger: {
								trigger: `.${css.wrapper}`,
								start: "center center",
								end: () => `+=${itemsEls.length * 30}%`,
								scrub: true,
								pin: true,
							},
						});
					}
				},
			);
		},
		{ scope: ref },
	);

	return (
		<section
			className={css.block}
			ref={ref}
		>
			<Wrapper className={css.wrapper}>
				{subTitle && <h2 className={css.subTitle}>{subTitle}</h2>}
				{title && <div className={css.title}>{toBr(title)}</div>}
				{items && items.length > 0 && (
					<div className={css.items}>
						{items.map((item, idx) => (
							<Item
								key={idx}
								{...item}
							/>
						))}
					</div>
				)}
			</Wrapper>
		</section>
	);
};

const Item = ({
	number,
	title,
}: NonNullable<FloatingNumbersType["items"]>[0]) => {
	const numberRef = useRef<HTMLSpanElement>(null);

	/* useEffect(() => {
		if (!numberRef.current) return;

		const fittyObj = fitty(numberRef.current, {
			maxSize: 160,
		});

		return () => fittyObj.unsubscribe();
	}, []); */

	return (
		<div className={css.item}>
			<div className={css.itemInner}>
				{number && (
					<div className={css.itemNumber}>
						<span ref={numberRef}>{number}</span>
					</div>
				)}
				{title && <div className={css.itemTitle}>{title}</div>}
			</div>
		</div>
	);
};

export default FloatingNumbers;
