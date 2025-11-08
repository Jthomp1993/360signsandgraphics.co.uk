"use client";

import type { OtherPillars as OtherPillarsType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import getLinkProps from "@util/getLinkProps";

import css from "./index.module.css";

const OtherPillars: React.FC<OtherPillarsType> = ({ title, prev, next }) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!ref.current) return;

			const tl = gsap.timeline({
				defaults: {
					ease: "none",
				},
				scrollTrigger: {
					trigger: ref.current,
					start: "top bottom",
					end: "bottom bottom",
					scrub: true,
				},
			});

			tl.fromTo(
				`.${css.prevLink}`,
				{
					y: "30%",
				},
				{
					y: "-30%",
				},
				0,
			);

			tl.fromTo(
				`.${css.nextLink}`,
				{
					y: "40%",
				},
				{
					y: "-35%",
				},
				0,
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
				{title && <h2 className={css.title}>{title}</h2>}
				<div className={css.links}>
					{prev && prev.link && prev.link.label && (
						<div className={`${css.link} ${css.prevLink}`}>
							<Link
								{...getLinkProps(prev.link)}
								style={{ backgroundColor: prev.bgColor || undefined }}
							>
								<span data-text={prev.link.label}>
									<span>
										{prev.link.label.split(" ").map((word, index) => (
											<span key={index}>{word}</span>
										))}
									</span>
								</span>
							</Link>
						</div>
					)}
					{next && next.link && next.link.label && (
						<div className={`${css.link} ${css.nextLink}`}>
							<Link
								{...getLinkProps(next.link)}
								style={{ backgroundColor: next.bgColor || undefined }}
							>
								<span data-text={next.link.label}>
									<span>
										{next.link.label.split(" ").map((word, index) => (
											<span key={index}>{word}</span>
										))}
									</span>
								</span>
							</Link>
						</div>
					)}
				</div>
			</Wrapper>
		</section>
	);
};

export default OtherPillars;
