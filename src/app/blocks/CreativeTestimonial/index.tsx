"use client";

import type { CreativeTestimonial as CreativeTestimonialType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import fitty from "fitty";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Wrapper from "@components/Wrapper";
import toBr from "@util/toBr";

import css from "./index.module.css";

const CreativeTestimonial: React.FC<CreativeTestimonialType> = ({
	subTitle,
	title,
	name,
	role,
	slide1,
	slide2,
}) => {
	const blockRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLSpanElement>(null);
	const metaRef = useRef<HTMLDivElement>(null);

	// Title fit
	useEffect(() => {
		if (!titleRef.current) return;

		const fittyInstance = fitty(titleRef.current, {
			minSize: 12,
			maxSize: 280,
		});

		const handleResize = () => {
			if (!metaRef.current) return;

			gsap.set(metaRef.current, {
				width: titleRef.current?.offsetWidth,
			});
		};

		titleRef.current.addEventListener("fit", handleResize);

		return () => {
			titleRef?.current?.removeEventListener("fit", handleResize);
			fittyInstance.unsubscribe();
		};
	}, []);

	useGSAP(
		() => {
			new SplitText(`.${css.text1}`, {
				type: "lines",
				linesClass: css.textLine,
			});

			new SplitText(`.${css.text2}`, {
				type: "lines",
				linesClass: css.textLine,
			});

			gsap.fromTo(
				`.${css.image}`,
				{
					rotate: -3,
				},
				{
					rotate: 3,
					duration: 3,
					ease: "power2.inOut",
					yoyo: true,
					repeat: -1,
				},
			);

			const tl = gsap.timeline({
				defaults: {
					ease: "none",
				},
				scrollTrigger: {
					trigger: `.${css.slidesWrapper}`,
					start: "top top",
					end: "+=200%",
					pin: `.${css.slides}`,
					scrub: true,
				},
			});

			// Slide 1

			tl.to(
				`.${css.quote}`,
				{
					y: "-50%",
				},
				"slide1Out",
			);

			tl.to(
				`.${css.text}`,
				{
					y: "-80vh",
				},
				"slide1Out",
			);

			// Slide 2

			tl.to(
				`.${css.image}`,
				{
					y: "-50%",
				},
				"slide1Out",
			);

			tl.to(
				`.${css.text1} .${css.textLine}`,
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					stagger: 0.1,
				},
				"slide1Out+=30%",
			);

			tl.to(
				`.${css.text2} .${css.textLine}`,
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					stagger: 0.1,
				},
				"slide1Out+=30%",
			);

			tl.to(
				`.${css.text1}`,
				{
					x: "5vw",
				},
				"slide1Out+=50%",
			);

			tl.to(
				`.${css.text2}`,
				{
					x: "-5vw",
				},
				"slide1Out+=50%",
			);
		},
		{ scope: blockRef, revertOnUpdate: true },
	);

	return (
		<section
			ref={blockRef}
			className={css.block}
		>
			<Wrapper className={css.titleWrapper}>
				{subTitle && <div className={css.subTitle}>{subTitle}</div>}
				{title && (
					<h2 className={css.title}>
						<span ref={titleRef}>{title}</span>
					</h2>
				)}
				{(name || role) && (
					<div
						ref={metaRef}
						className={css.meta}
					>
						{name && <div className={css.name}>{name}</div>}
						<span></span>
						{role && <div className={css.role}>{role}</div>}
					</div>
				)}
			</Wrapper>
			<Wrapper className={css.slidesWrapper}>
				<div className={css.slides}>
					{slide1 && (
						<div className={css.slide1}>
							<div className={css.text}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="139"
									height="139"
									className={css.quote}
									viewBox="0 0 139 139"
									fill="none"
								>
									<circle
										cx="69.5"
										cy="69.5"
										r="69.5"
										fill="#FF00C8"
									/>
									<path
										fill="#000"
										d="M94 99H73.103V65.117L84.152 40H94v59Zm-49 0V65.117L55.809 40h10.088v59H45Z"
									/>
								</svg>
								<p>{toBr(slide1.text)}</p>
							</div>
						</div>
					)}
					{slide2 && (
						<div className={css.slide2}>
							{slide2.image &&
								typeof slide2.image === "object" &&
								slide2.image.url && (
									<Image
										className={css.image}
										src={slide2.image.url}
										alt={name || ""}
										width={636}
										height={840}
									/>
								)}
							{slide2.text1 && (
								<div className={css.text1}>{toBr(slide2.text1)}</div>
							)}
							{slide2.text2 && (
								<div className={css.text2}>{toBr(slide2.text2)}</div>
							)}
						</div>
					)}
				</div>
			</Wrapper>
		</section>
	);
};

export default CreativeTestimonial;
