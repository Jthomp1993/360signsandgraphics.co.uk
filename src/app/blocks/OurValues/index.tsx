"use client";

import type { OurValues as OurValuesType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import toBr from "@util/toBr";

import css from "./index.module.css";

const Item = ({ label, copy }: NonNullable<OurValuesType["items"]>[0]) => {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});

			tl.fromTo(
				`.${css.itemCopy}`,
				{
					y: "-100%",
				},
				{
					y: "100%",
				},
				0,
			);

			tl.fromTo(
				`.${css.itemLabel}`,
				{
					y: "30%",
				},
				{
					y: "-30%",
				},
				0,
			);
		},
		{ scope: ref },
	);

	return (
		<div
			ref={ref}
			className={css.item}
		>
			<div className={css.itemInner}>
				{label && <h3 className={css.itemLabel}>{toBr(label)}</h3>}
				{copy && <p className={css.itemCopy}>{toBr(copy)}</p>}
			</div>
		</div>
	);
};

const OurValues: React.FC<OurValuesType> = ({ title, items }) => {
	return (
		<section
			className={css.block}
			data-light-scheme
		>
			<Wrapper>
				{title && <h2 className={css.title}>{title}</h2>}
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

export default OurValues;
