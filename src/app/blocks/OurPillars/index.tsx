"use client";

import type { OurPillars as OurPillarsType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import getLinkProps from "@util/getLinkProps";

import css from "./index.module.css";
import toBr from "@util/toBr";

const OurPillars: React.FC<OurPillarsType> = ({ title, items }) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!ref.current) return;

			const q = gsap.utils.selector(ref.current);
			const itemsEl = q<HTMLElement>(`.${css.items}`)[0];
			const itemsEls = q<HTMLElement>(`.${css.item}`);
			const anglesStart = [-6, 0, 6];
			const anglesEnd = [-3, 0, 3];

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
						rotate: (idx) => anglesStart[idx],
					});

					if (isDesktop) {
						gsap.from(itemsEls, {
							rotate: (idx) => anglesEnd[idx],
							y: (idx) => (idx % 2 === 0 ? "20%" : "10%"),
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
		>
			<Wrapper className={css.wrapper}>
				{title && <div className={css.title}>{title}</div>}
				<div className={css.items}>
					{items &&
						items.length > 0 &&
						items.map(({ title, image, link }, idx) => (
							<div
								className={`${css.item}`}
								key={idx}
							>
								<div className={css.itemInner}>
									{image && typeof image === "object" && image.url && (
										<Image
											src={image.url}
											alt={title}
											width={794}
											height={1050}
										/>
									)}
									<h6 className={css.itemTitle}>{toBr(title)}</h6>
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

export default OurPillars;
