"use client";

import type { Hero2 as Hero2Type } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import useMediaQuery from "@hooks/useMediaQuery";

import css from "./index.module.css";

const Hero2: React.FC<Hero2Type> = ({ title, copyHTML, image }) => {
	const ref = useRef<HTMLElement>(null);
	const isSmUp = useMediaQuery("smUp");

	useGSAP(
		() => {
			if (!ref.current || !isSmUp) return;

			gsap.from("img", {
				scale: 0.5,
				ease: "none",
				scrollTrigger: {
					trigger: `.${css.image}`,
					start: () => `50% ${window.innerHeight - 30}`,
					end: () => `100% ${window.innerHeight - 30}`,
					scrub: true,
				},
			});
		},
		{ scope: ref, dependencies: [isSmUp], revertOnUpdate: true },
	);

	return (
		<section
			ref={ref}
			className={css.block}
		>
			<Wrapper>
				{title && <h2 className={css.title}>{title}</h2>}
				{copyHTML && (
					<div
						className={css.copy}
						dangerouslySetInnerHTML={{ __html: copyHTML }}
					/>
				)}
				{image && typeof image === "object" && image.url && (
					<div className={css.image}>
						<Image
							src={image.url}
							alt={title || image.alt || ""}
							width={1920}
							height={1080}
						/>
					</div>
				)}
			</Wrapper>
		</section>
	);
};

export default Hero2;
