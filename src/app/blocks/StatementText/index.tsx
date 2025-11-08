"use client";

import type {
	Media,
	StatementText as StatementTextType,
} from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Fragment, useRef } from "react";

import Button from "@components/Button";
import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const ImageInText = ({
	ref: externalRef,
	image,
}: {
	ref?: React.RefObject<HTMLDivElement | null>;
	image?: string | Media | null;
}) => {
	const internalRef = useRef<HTMLDivElement>(null);

	const ref = externalRef || internalRef;

	if (!image || typeof image === "string" || !image.url) return <></>;
	return (
		<div
			ref={ref}
			className={css.imageInText}
		>
			<Image
				src={image.url}
				alt={image.alt || ""}
				width={500}
				height={400}
			/>
		</div>
	);
};

const StatementText: React.FC<StatementTextType> = ({
	title,
	subTitle,
	link,
	images,
}) => {
	const ref = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!titleRef.current || !ref.current) return;

			const words = gsap.utils.toArray<HTMLElement>(
				`span[data-text], .${css.imageInText}`,
			);

			const wrapper = gsap.utils.toArray<HTMLElement>(`.${css.wrapper}`);

			const tl = gsap.timeline({
				defaults: {
					ease: "none",
				},
				scrollTrigger: {
					trigger: titleRef.current,
					pin: wrapper,
					pinSpacing: true,
					start: "50% 50%",
					end: "+=140%",
					scrub: true,
				},
			});

			words.forEach((el) => {
				if (el.classList.contains(css.imageInText)) {
					tl.to(el, {
						duration: 0.3,
						onStart: () => {
							el.classList.add(css.active);
						},
						onReverseComplete: () => {
							el.classList.remove(css.active);
						},
					});
				} else {
					tl.to(el, {
						"--clip-path": "0% 0%, 100% 0%, 100% 100%, 0% 100%",
						ease: "power1.out",
						duration: () => (el.textContent?.length || 20) * 0.05,
					});
				}
			});
		},
		{ scope: ref, revertOnUpdate: true },
	);

	if (!title) return <></>;

	const titleLines = title.split("\n");
	let imageIdx = 0;

	return (
		<section
			ref={ref}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				{subTitle && <h2 className={css.subTitle}>{subTitle}</h2>}
				<div
					ref={titleRef}
					className={css.title}
				>
					{titleLines.map((line, i) => (
						<Fragment key={i}>
							{line.split("|").map((part, j) =>
								j === 0 ? (
									<span
										key={j}
										data-text={part.trim()}
									>
										<span>{part.trim()}</span>
									</span>
								) : (
									<Fragment key={j}>
										<ImageInText image={images?.[imageIdx]?.image} />
										<span data-text={part.trim()}>
											<span>{part.trim()}</span>
										</span>
										{!!imageIdx++ && ""}
									</Fragment>
								),
							)}
							{i < titleLines.length - 1 && <br />}
						</Fragment>
					))}
				</div>
				{link && link.url && link.label && (
					<div className={css.buttonWrapper}>
						<Button
							className={css.button}
							{...link}
						/>
					</div>
				)}
			</Wrapper>
		</section>
	);
};

export default StatementText;
