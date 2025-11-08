"use client";

import type { TextReveal as TextRevealType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import fitty from "fitty";
import gsap from "gsap";
import parse from "html-react-parser";
import Image from "next/image";
import { useEffect, useRef } from "react";

import Button from "@components/Button";
import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const TextReveal: React.FC<TextRevealType> = ({ title, copyHTML, link }) => {
	const titleRef = useRef<HTMLSpanElement>(null);
	const blockRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!titleRef.current) return;

		const fittyInstance = fitty(titleRef.current, {
			maxSize: 160,
		});

		return () => {
			fittyInstance.unsubscribe();
		};
	}, []);

	useGSAP(
		() => {
			if (!blockRef.current) return;

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

					const { isDesktop } = context.conditions;

					if (isDesktop) {
						const tl = gsap.timeline({
							defaults: {
								ease: "none",
							},
							scrollTrigger: {
								trigger: blockRef.current,
								start: "0% 50%",
								//end: "+=200%",
								//scrub: true,
								//pin: true,
							},
						});

						tl.to(`.${css.title} span`, {
							scale: 2.3,
						});

						tl.to(
							`.${css.globeContainer}`,
							{
								scale: 1.7,
								rotate: -90,
								y: "30%",
								x: "-95%",
								/* x: () => {
									const contentX = +gsap.getProperty(
										`.${css.contentInner}`,
										"x",
									);
									const globeX = +gsap.getProperty(
										`.${css.globeContainer}`,
										"x",
									);
									const globeWidth =
										(+gsap.getProperty(`.${css.globeContainer}`, "width") / 2) *
										1.7;
									const wrapperPadding = +gsap.getProperty(
										`.${css.wrapper}`,
										"padding-left",
									);

									return contentX - globeX - globeWidth - wrapperPadding - 50;
								}, */
							},
							"<",
						);

						tl.to(
							`.${css.contentInner}`,
							{
								x: "0%",
							},
							"<",
						);
					} else {
						const tl = gsap.timeline({
							defaults: {
								ease: "none",
							},
							scrollTrigger: {
								trigger: blockRef.current,
								start: "top 50%",
								//end: "bottom bottom",
								//scrub: true,
							},
						});

						tl.to(`.${css.title} span`, {
							scale: 1.7,
						});

						tl.to(
							`.${css.globeContainer}`,
							{
								scale: 1.3,
								rotate: -45,
								x: "-50%",
								y: "-10%",
							},
							"<",
						);

						tl.to(
							`.${css.contentInner}`,
							{
								x: "0%",
							},
							"<",
						);
					}
				},
			);
		},
		{ scope: blockRef },
	);

	return (
		<section
			ref={blockRef}
			className={css.block}
		>
			<Wrapper className={css.titleWrapper}>
				{title && (
					<h2 className={css.title}>
						<span ref={titleRef}>{title}</span>
					</h2>
				)}
			</Wrapper>
			<Wrapper className={css.wrapper}>
				<div className={css.globeContainer}>
					<Image
						src="/earth.png"
						alt="Globe"
						width={1200}
						height={1200}
					/>
				</div>
				<div className={css.content}>
					<div className={css.contentInner}>
						{copyHTML && <div className={css.copy}>{parse(copyHTML)}</div>}
						{link && (
							<Button
								{...link}
								className={css.button}
							/>
						)}
					</div>
				</div>
			</Wrapper>
		</section>
	);
};

export default TextReveal;
