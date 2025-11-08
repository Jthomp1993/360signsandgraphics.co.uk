"use client";

import type { HeroCarousel as HeroCarouselType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import Wrapper from "@components/Wrapper";
import getImageHeight from "@util/getImageHeight";
import horizontalLoop from "@util/horizontalLoop";
import toTitle from "@util/toTitle";

import css from "./index.module.css";

const ImageCarousel = ({ images }: Pick<HeroCarouselType, "images">) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const defaultSpeed = 1;
	const maxSpeed = 5;

	useGSAP(
		() => {
			if (!carouselRef.current) return;

			const imageElements = gsap.utils.toArray<HTMLImageElement>(`img`);

			timelineRef.current = horizontalLoop(imageElements, {
				repeat: -1,
				speed: defaultSpeed,
				scrollTrigger: {
					trigger: carouselRef.current,
					end: "bottom+=30% top",
					onEnter: () => timelineRef.current?.play(),
					onEnterBack: () => timelineRef.current?.play(),
					onLeave: () => timelineRef.current?.pause(),
					onLeaveBack: () => timelineRef.current?.pause(),
					onUpdate: (self) => {
						if (!timelineRef.current) return;

						// Get scroll velocity (positive when scrolling down, negative when scrolling up)
						const velocity = self.getVelocity() / 150;

						// Calculate new speed based on velocity, clamped between defaultSpeed and maxSpeed
						const newSpeed = gsap.utils.clamp(
							-maxSpeed,
							maxSpeed,
							defaultSpeed + velocity,
						);

						// Apply speed by adjusting timeScale of the timeline
						timelineRef.current.timeScale(newSpeed);
					},
				},
			});
		},
		{ scope: carouselRef },
	);

	if (!images || images.length === 0) return null;

	return (
		<div className={css.carousel}>
			<div
				className={css.carouselInner}
				ref={carouselRef}
			>
				{images.map(
					(image, idx) =>
						image &&
						typeof image === "object" &&
						image.url && (
							<Image
								key={idx}
								src={image.url}
								alt={image.alt || ""}
								width={700}
								height={getImageHeight(700, image)}
								style={{ objectFit: "cover" }}
							/>
						),
				)}
			</div>
		</div>
	);
};
const HeroCarousel: React.FC<HeroCarouselType> = ({ title, copy, images }) => {
	return (
		<section className={css.block}>
			<Wrapper>
				<h2 className={css.title}>{toTitle(title)}</h2>
				{copy && <div className={css.copy}>{copy}</div>}
			</Wrapper>
			<ImageCarousel images={images} />
		</section>
	);
};

export default HeroCarousel;
