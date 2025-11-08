"use client";

import type { Stories as StoriesType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import getLinkProps from "@util/getLinkProps";

import css from "./index.module.css";

const Stories: React.FC<StoriesType> = ({ subTitle, title, items }) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!ref.current) return;

			const q = gsap.utils.selector(ref.current);
			const itemsEl = q<HTMLElement>(`.${css.items}`)[0];
			const itemsEls = q<HTMLElement>(`.${css.item}`);

			// Use matchMedia for responsive animations
			const mm = gsap.matchMedia();
			const breakPoint = 1135;

			// Desktop animation
			mm.add(
				{
					isDesktop: `(min-width: ${breakPoint}px)`,
					isMobile: `(max-width: ${breakPoint - 1}px)`,
				},
				(context) => {
					if (!context.conditions) return;

					const { isDesktop, isMobile } = context.conditions;

					gsap.set(itemsEls, {
						rotate: () => gsap.utils.random(-6, 6),
					});

					if (isDesktop) {
						gsap.from(itemsEls, {
							rotate: () => gsap.utils.random(-6, 6),
							y: (idx) => (idx % 2 === 0 ? "10%" : "-10%"),
							scrollTrigger: {
								trigger: `.${css.items}`,
								start: "top bottom",
								end: "bottom center",
								scrub: true,
							},
						});
					} else {
						gsap.to(itemsEls, {
							rotate: () => gsap.utils.random(-6, 6),
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
			ref={ref}
			className={css.block}
			data-light-scheme
		>
			<Wrapper className={css.wrapper}>
				{subTitle && <h2 className={css.subTitle}>{subTitle}</h2>}
				{title && <div className={css.title}>{title}</div>}
				<div className={css.items}>
					{items &&
						items.length > 0 &&
						items.map(({ bgColor, title, tags, image, link }, idx) => (
							<div
								className={`${css.item} ${bgColor ? css[bgColor] : ""}`}
								key={idx}
							>
								<div className={css.itemInner}>
									<h6 className={css.itemTitle}>{title}</h6>
									{tags && tags.length > 0 && (
										<div className={css.itemTags}>
											{tags.map((tag, idx) => (
												<div
													className={css.itemTag}
													key={idx}
												>
													{tag}
												</div>
											))}
										</div>
									)}
									{image && typeof image === "object" && image.url && (
										<div className={css.itemImage}>
											<Image
												src={image.url}
												alt={title}
												width={600}
												height={330}
											/>
										</div>
									)}
									{link && getLinkProps(link).href && (
										<Link
											className={css.itemLink}
											{...getLinkProps(link)}
										/>
									)}
								</div>
							</div>
						))}
				</div>
			</Wrapper>
		</section>
	);
};

export default Stories;
