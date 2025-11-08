"use client";

import type { TitleWithImage as TitleWithImageType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import getLinkProps from "@util/getLinkProps";
import toBr from "@util/toBr";

import css from "./index.module.css";

const TitleWithImage: React.FC<TitleWithImageType> = ({
	subTitle,
	title,
	image,
	enableButtons,
	buttons,
}) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const titleEl = gsap.utils.toArray<HTMLHeadingElement>(
				`.${css.title}`,
			)[0];
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

			const splitTitle = new SplitText(titleEl, {
				type: "lines",
				linesClass: css.titleLine,
			});

			subTitle &&
				tl.from(`.${css.subTitle}`, {
					opacity: 0,
					duration: 1,
					ease: "power2.out",
				});

			tl.to(
				splitTitle.lines,
				{
					"--clip-path": "0% 0%, 100% 0%, 100% 100%, 0% 100%",
					stagger: 0.2,
					duration: 1,
					ease: "power2.in",
				},
				"<50%",
			);

			enableButtons &&
				buttons &&
				buttons.length > 0 &&
				tl.from(
					`.${css.button}`,
					{
						y: "100%",
						stagger: 0.2,
						ease: "power2.out",
					},
					"<50%",
				);

			image &&
				typeof image === "object" &&
				image.url &&
				tl.from(
					`.${css.image}`,
					{
						opacity: 0,
						x: 50,
						duration: 1,
						ease: "power2.out",
					},
					"<50%",
				);
		},
		{ scope: ref, dependencies: [subTitle] },
	);

	return (
		<section
			ref={ref}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				<div className={css.content}>
					{subTitle && <div className={css.subTitle}>{subTitle}</div>}
					<h2 className={css.title}>{toBr(title)}</h2>
					{enableButtons && buttons && buttons.length > 0 && (
						<div className={css.buttons}>
							{buttons.map(
								({ isActive, color, link }, idx) =>
									link && (
										<Link
											key={idx}
											{...getLinkProps(link)}
											className={css.button}
											data-active={isActive}
											style={{ "--accent-color": color } as React.CSSProperties}
										>
											<span data-label={link.label}>
												<span>{link.label}</span>
											</span>
										</Link>
									),
							)}
						</div>
					)}
				</div>
				{image && typeof image === "object" && image.url && (
					<div className={css.image}>
						<Image
							src={image.url}
							alt={title}
							width={800}
							height={800}
						/>
					</div>
				)}
			</Wrapper>
		</section>
	);
};

export default TitleWithImage;
