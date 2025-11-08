"use client";

import type { FloatingTeam2 as FloatingTeam2Type } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import fitty from "fitty";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Wrapper from "@components/Wrapper";
import toBr from "@util/toBr";

import css from "./index.module.css";

const FloatingTeam2: React.FC<FloatingTeam2Type> = ({ title, items }) => {
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
										`0%+=${window.innerHeight * 0.5 * gsap.utils.random(.9, 1.1)} center`,
									end: () =>
										`100%-=${window.innerHeight * gsap.utils.random(.1, .5)} center`,
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
	name,
	copy,
	image,
	label,
}: NonNullable<FloatingTeam2Type["items"]>[0]) => {
	const nameRef = useRef<HTMLSpanElement>(null);
	const itemInnerRef = useRef<HTMLDivElement>(null);
	const tlRef = useRef<gsap.core.Timeline>(null);
	const [isFlipped, setIsFlipped] = useState(false);

	useGSAP(() => {
		if (!itemInnerRef.current) return;

		tlRef.current = gsap.timeline({
			paused: true,
		});

		tlRef.current.to(itemInnerRef.current, {
			rotationY: 180,
			duration: 0.6,
			ease: "power2.inOut",
		});
	});

	useEffect(() => {
		if (!tlRef.current) return;

		if (isFlipped) {
			tlRef.current.play();
		} else {
			tlRef.current.reverse();
		}
	}, [isFlipped]);

	useEffect(() => {
		if (!nameRef.current) return;

		fitty(nameRef.current, {
			maxSize: 140,
		});
	}, []);

	const imageUrl = typeof image === "object" && image?.url ? image.url : "";

	return (
		<div className={css.item}>
			<div
				ref={itemInnerRef}
				className={css.itemInner}
				onClick={() => setIsFlipped((prev) => !prev)}
			>
				<div className={css.cardFront}>
					{label && <h3 className={css.itemLabel}>{label}</h3>}
					{copy && <p className={css.itemCopy}>{toBr(copy)}</p>}
					<button className={css.itemButton}>Tap to reveal</button>
				</div>
				<div className={css.cardBack}>
					{imageUrl && (
						<Image
							className={css.itemImage}
							src={imageUrl}
							alt={name || ""}
							width={600}
							height={600}
						/>
					)}
					{name && (
						<h3 className={css.itemName}>
							<span ref={nameRef}>{name}</span>
						</h3>
					)}
				</div>
			</div>
		</div>
	);
};

export default FloatingTeam2;
