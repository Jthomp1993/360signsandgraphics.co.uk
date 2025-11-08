"use client";

import type { FloatingTeam as FloatingTeamType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import fitty from "fitty";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import Wrapper from "@components/Wrapper";
import toBr from "@util/toBr";

import css from "./index.module.css";

const FloatingTeam: React.FC<FloatingTeamType> = ({
	subTitle,
	title,
	items,
}) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!ref.current) return;

			const q = gsap.utils.selector(ref.current);
			const itemsEl = q<HTMLElement>(`.${css.item}`);
			const wrapperEl = q<HTMLElement>(`.${css.wrapper}`)[0];

			gsap.fromTo(
				itemsEl,
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

					ScrollTrigger.create({
						trigger: ref.current,
						start: "50% center",
						end: () => `+=${window.innerHeight}px`,
						pin: wrapperEl,
						pinSpacing: true,
					});

					gsap.set(itemsEl, {
						y: () => window.innerHeight / 2 + 50,
						x: () => (isDesktop ? "0%" : "-50%"),
					});

					if (isDesktop) {
						itemsEl.forEach((item) => {
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
						gsap.to(itemsEl, {
							y: (idx) =>
								(window.innerHeight / 2 + itemsEl[idx].offsetHeight + 50) * -1,
							stagger: 0.13,
							scrollTrigger: {
								trigger: ref.current,
								start: () => `top center`,
								end: () => `bottom center`,
								scrub: true,
							},
							ease: "power1.in",
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
			data-light-scheme
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
	image,
	name,
	post,
	bgColor,
}: NonNullable<FloatingTeamType["items"]>[0]) => {
	const nameRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!nameRef.current) return;

		const fittyObj = fitty(nameRef.current, {
			minSize: 1,
			maxSize: 140,
		});

		return () => fittyObj.unsubscribe();
	}, []);

	return (
		<div
			className={css.item}
			style={{ backgroundColor: bgColor || undefined }}
		>
			{image && typeof image === "object" && image.url && (
				<Image
					src={image.url}
					alt={name}
					width={768}
					height={970}
				/>
			)}
			<div className={css.content}>
				<h6 className={css.name}>
					<span ref={nameRef}>{name}</span>
				</h6>
				{post && <div className={css.post}>{post}</div>}
			</div>
		</div>
	);
};

export default FloatingTeam;
