"use client";

import type { Reviews as ReviewsType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const Reviews: React.FC<ReviewsType> = ({ subTitle, title, items }) => {
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

					if (isDesktop) {
						gsap.from(itemsEls, {
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
		{ scope: ref, revertOnUpdate: true },
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
						items.map(({ image, title, role, quoteHTML }, idx) => (
							<div
								className={`${css.item}`}
								key={idx}
							>
								<div className={css.itemInner}>
									{image && typeof image === "object" && image.url && (
										<div className={css.itemImage}>
											<Image
												src={image.url}
												alt={title}
												width={160}
												height={160}
											/>
										</div>
									)}
									<h6 className={css.itemTitle}>{title}</h6>
									<div className={css.itemRole}>{role}</div>
									{quoteHTML && (
										<div className={css.itemQuote}>{parse(quoteHTML)}</div>
									)}
								</div>
							</div>
						))}
				</div>
			</Wrapper>
		</section>
	);
};

export default Reviews;
