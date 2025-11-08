"use client";

import type { Testimonial as TestimonialType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import toBr from "@util/toBr";

import css from "./index.module.css";

const Testimonial: React.FC<TestimonialType> = ({
	image,
	quote,
	name,
	role,
}) => {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.from(`.${css.image}`, {
				y: "100%",
				rotate: 10,
				scrollTrigger: {
					trigger: ref.current,
					start: "top 70%",
					end: "bottom 70%",
					scrub: 1,
				},
			});
		},
		{ scope: ref },
	);

	return (
		<section
			ref={ref}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				{quote && <blockquote className={css.quote}>{toBr(quote)}</blockquote>}
				{name && <div className={css.name}>{name}</div>}
				{role && <div className={css.role}>{role}</div>}
				{image && typeof image === "object" && image.url && (
					<div className={css.image}>
						<Image
							src={image.url}
							alt={image.alt || ""}
							width={800}
							height={1062}
						/>
					</div>
				)}
			</Wrapper>
		</section>
	);
};

export default Testimonial;
