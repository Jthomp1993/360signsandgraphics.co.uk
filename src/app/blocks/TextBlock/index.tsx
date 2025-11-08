"use client";

import type { TextBlock as TextBlockType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import parse from "html-react-parser";
import { useRef } from "react";

import Button from "@components/Button";
import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const TextBlock: React.FC<TextBlockType> = ({
	title,
	titleStyle,
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

			if (title) {
				gsap.set(`h2`, {
					clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
				});

				tl.to(
					`h2`,
					{
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
						duration: 1,
						ease: "power2.out",
					},
					"<50%",
				);
			}

			tl.from(`.${css.content}`, {
				autoAlpha: 0,
				duration: 1,
				ease: "power2.out",
			});
		},
		{ scope: ref, dependencies: [title] },
	);

	return (
		<section
			ref={ref}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				{title && (
					<h2
						className={titleStyle === "small" ? css.smallTitle : css.title}
					>
						{title}
					</h2>
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

export default TextBlock;
