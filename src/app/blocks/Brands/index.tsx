"use client";

import type { Brands as BrandsType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import parse from "html-react-parser";
import Image from "next/image";
import { Fragment, useRef } from "react";

import Button from "@components/Button";
import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const Brands: React.FC<BrandsType> = ({
	title,
	copyHTML,
	images,
	textWithImage,
}) => {
	const blockRef = useRef<HTMLElement>(null);
	const titleLines = title.split("\n");

	useGSAP(
		() => {
			const tl = gsap.timeline({
				pause: true,
				scrollTrigger: {
					trigger: blockRef.current,
					invalidateOnRefresh: false,
					start: () =>
						window.innerHeight / window.innerWidth > 1.7
							? "top 80%"
							: "top center",
				},
			});

			tl.to(`.${css.titleLine}`, {
				x: 0,
				"--clip-path": "0% 0%, 100% 0%, 100% 100%, 0% 100%",
				stagger: 0.3,
				duration: 1,
				ease: "power2.in",
			});

			tl.from(
				`.${css.copy1}`,
				{
					autoAlpha: 0,
					ease: "power2.in",
				},
				"<50%",
			);

			tl.from(
				`.${css.logosWrapper}`,
				{
					autoAlpha: 0,
					ease: "power2.in",
				},
				"<50%",
			);

			tl.from(
				`.${css.image}`,
				{
					autoAlpha: 0,
					ease: "power2.in",
				},
			);

			tl.from(
				`.${css.content}`,
				{
					autoAlpha: 0,
					ease: "power2.in",
				},
				"<50%",
			);
		},
		{ scope: blockRef },
	);

	return (
		<section
			ref={blockRef}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				{title && (
					<h2 className={css.title}>
						{titleLines.map((line, idx) => (
							<span
								className={css.titleLine}
								key={idx}
							>
								<span>{line}</span>
							</span>
						))}
					</h2>
				)}
				{copyHTML && <div className={css.copy1}>{parse(copyHTML)}</div>}
				{images && images.length > 0 && (
					<div
						className={css.logosWrapper}
						style={
							{
								"--cols": images.length,
							} as React.CSSProperties
						}
					>
						{[images, images, images].map((imageEls, idx) => (
							<div
								key={idx}
								className={css.logos}
							>
								{imageEls.map((image, idx) => (
									<Fragment key={idx}>
										{typeof image === "object" && image.url && (
											<Image
												src={image.url}
												alt={image.alt || ""}
												width={300}
												height={200}
											/>
										)}
									</Fragment>
								))}
							</div>
						))}
					</div>
				)}
			</Wrapper>
			{textWithImage && (
				<Wrapper className={css.textWithImageWrapper}>
					{textWithImage.image &&
						typeof textWithImage.image === "object" &&
						textWithImage.image.url && (
							<div className={css.image}>
								<Image
									src={textWithImage.image.url}
									alt={textWithImage.image.alt || ""}
									width={1000}
									height={1300}
								/>
							</div>
						)}
					<div className={css.content}>
						{textWithImage.copyHTML && (
							<div className={css.copy}>{parse(textWithImage.copyHTML)}</div>
						)}
						{textWithImage.link && (
							<Button
								{...textWithImage.link}
								className={css.button}
							/>
						)}
					</div>
				</Wrapper>
			)}
		</section>
	);
};

export default Brands;
