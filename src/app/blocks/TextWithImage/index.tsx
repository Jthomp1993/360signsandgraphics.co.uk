"use client";

import type { TextWithImage as TextWithImageType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";

import Button from "@components/Button";
import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const TextWithImage: React.FC<TextWithImageType> = ({
	image,
	aspectRatio,
	copyHTML,
	link,
}) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ref.current,
					invalidateOnRefresh: false,
					start: () =>
						window.innerHeight / window.innerWidth > 1.7
							? "top 80%"
							: "top center",
				},
			});

			tl.from(`.${css.content}`, {
				autoAlpha: 0,
				duration: 1,
				ease: "power2.out",
			});

			tl.from(
				`.${css.image}`,
				{
					autoAlpha: 0,
					x: -50,
					duration: 1,
					ease: "power2.out",
				},
				"<50%",
			);
		},
		{ scope: ref },
	);

	return (
		<section
			ref={ref}
			className={css.block}
			data-type={aspectRatio}
		>
			<Wrapper className={css.wrapper}>
				{image && typeof image === "object" && image.url && (
					<div
						className={`${css.image} ${aspectRatio === "portrait" ? css.portrait : ""}`}
					>
						<Image
							src={image.url}
							alt={image.alt || ""}
							width={1000}
							height={1300}
						/>
					</div>
				)}
				<div className={css.content}>
					{copyHTML && <div className={css.copy}>{parse(copyHTML)}</div>}
					{link && (
						<Button
							{...link}
							className={css.button}
						/>
					)}
				</div>
			</Wrapper>
		</section>
	);
};

export default TextWithImage;
