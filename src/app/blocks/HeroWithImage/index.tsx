"use client";

import type { HeroWithImage as HeroWithImageType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import fitty from "fitty";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import Image from "next/image";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import toBr from "@util/toBr";

import css from "./index.module.css";

const HeroWithImage: React.FC<HeroWithImageType> = ({ title, image }) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			new SplitText(`.${css.title}`, {
				type: "lines",
				linesClass: css.titleLine,
			});

			const fittyObj = fitty(`.${css.title}`, {
				maxSize: 280,
				multiLine: true,
			});

			gsap.to("img", {
				y: () => +gsap.getProperty(`.${css.title}`, "lineHeight") * -0.3,
				rotate: "-3deg",
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: "+=70%",
					scrub: 1,
					pin: `.${css.wrapper}`,
				},
			});

			return () => {
				fittyObj.forEach((fitty) => fitty.unsubscribe());
			};
		},
		{ scope: ref },
	);
	
	return (
		<section
			ref={ref}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				<div className={css.titleWrapper}>
					<h2 className={css.title}>{toBr(title)}</h2>
				</div>
				{image && typeof image === "object" && image.url && (
					<Image
						src={image.url}
						alt={title}
						width={966}
						height={672}
					/>
				)}
			</Wrapper>
		</section>
	);
};

export default HeroWithImage;
