"use client";

import type { HeroHomepage as HeroHomepageType } from "@/payload-types";
import type Player from "@vimeo/player";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import VimeoVideo from "@components/VimeoVideo";
import Wrapper from "@components/Wrapper";
import { useGlobalContext } from "@context/GlobalProvider";
import { useScrollSmoother } from "@context/ScrollSmootherProvider";
import getRect from "@util/getRect";

import css from "./index.module.css";

const ImagePlaceholder = ({
	ref,
}: {
	ref?: React.RefObject<HTMLDivElement | null>;
}) => {
	return (
		<div
			ref={ref}
			className={css.imagePlaceholder}
		></div>
	);
};

const Media = ({
	ref: externalRef,
	parentRef,
	image,
	vimeoVideoId,
}: Pick<HeroHomepageType, "image" | "vimeoVideoId"> & {
	ref?: React.RefObject<HTMLDivElement | null>;
	parentRef: React.RefObject<HTMLElement | null>;
}) => {
	// Create internal refs if external ones aren't provided
	const internalRef = useRef<HTMLDivElement>(null);

	// Use the provided refs or fall back to internal ones
	const ref = externalRef || internalRef;

	const smoother = useScrollSmoother();
	const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
	const [isPlayed, setIsPlayed] = useState<boolean>(false);
	const [player, setPlayer] = useState<Player | null>(null);
	const mediaInnerRef = useRef<HTMLDivElement>(null);

	const togglePlayPause = useCallback(() => {
		if (!vimeoVideoId || !player) return;

		player.getPaused().then(function (paused) {
			if (paused || !isPlayed) {
				player?.play();
				setIsPlaying(true);
			} else if (isPlayed) {
				player?.pause();
				setIsPlaying(false);
			}
			setIsPlayed(true);
		});
	}, [vimeoVideoId, player, isPlayed]);

	// Reset video to start when clicked first time
	useEffect(() => {
		if (!player || !isPlayed) return;

		// Reset video to start
		player.setCurrentTime(Number(0));
		player.setMuted(false);
		player.setVolume(1);
		player.setLoop(false);

		// Scroll to bottom of page
		smoother?.scrollTo(parentRef.current, true, "bottom bottom");
	}, [player, isPlayed]);

	// Media scroll animation
	useGSAP(() => {
		if (!ref.current) return;

		const parentNode = ref.current.parentElement;

		if (!parentNode) return;

		const imagePlaceholder = gsap.utils.toArray<HTMLDivElement>(
			`.${css.imagePlaceholder}`,
			parentNode,
		);

		if (imagePlaceholder.length === 0) return;

		// Set media scale and border radius
		const setMedia = ({ progress }: { progress: number }) => {
			gsap.set(mediaInnerRef.current, {
				scaleX: () => {
					if (!ref.current) return 1;

					const mediaAspectRatio =
						getRect(ref.current).width / getRect(ref.current).height;

					const windowAspectRatio =
						window.innerWidth < window.innerHeight
							? 16 / 9
							: window.innerWidth / window.innerHeight;

					return windowAspectRatio / mediaAspectRatio;
				},
			});

			gsap.set(ref.current, {
				"--border-radius": () => {
					if (!ref.current) return "0";

					const mediaAspectRatio =
						getRect(ref.current).width / getRect(ref.current).height;

					const r = (13 / getRect(imagePlaceholder[0]).width) * 100;
					const cR = ((window.innerWidth * r) / 100) * (1 - progress);
					const windowAspectRatio =
						window.innerWidth < window.innerHeight
							? 16 / 9
							: window.innerWidth / window.innerHeight;

					return `${cR}px / ${cR / (windowAspectRatio / mediaAspectRatio)}px`;
				},
			});
		};

		// Create new animation with updated values
		gsap.fromTo(
			ref.current,
			{
				top: () => getRect(imagePlaceholder[0]).top - getRect(parentNode).top,
				left: () =>
					getRect(imagePlaceholder[0]).left - getRect(parentNode).left,
				scaleX: () => getRect(imagePlaceholder[0]).width / window.innerWidth,
				scaleY: () =>
					getRect(imagePlaceholder[0]).height /
					(window.innerWidth < window.innerHeight
						? (window.innerWidth * 9) / 16
						: window.innerHeight),
			},
			{
				top: () =>
					window.innerWidth < window.innerHeight
						? `calc(100% - 50vh - ${((window.innerWidth / 2) * 9) / 16}px)`
						: "calc(100% - 100vh)",
				scaleX: 1,
				scaleY: 1,
				left: "0%",
				ease: "none",
				scrollTrigger: {
					trigger: parentNode,
					start: "top top",
					end: "bottom bottom",
					scrub: true,
					onEnter: setMedia,
					onUpdate: setMedia,
					onRefresh: setMedia,
				},
			},
		);
	}, []);

	if (!image && !vimeoVideoId) return <></>;

	return (
		<div
			ref={ref}
			className={css.media}
			onClick={togglePlayPause}
			data-cursor={isPlaying ? "pause" : "play"}
		>
			<div
				ref={mediaInnerRef}
				className={css.mediaInner}
			>
				{typeof image === "object" && image.url && (
					<Image
						src={image.url}
						alt={image.alt || ""}
						fill
						priority
					/>
				)}
				{vimeoVideoId && (
					<VimeoVideo
						setPlayer={setPlayer}
						className={css.vimeoVideo}
						videoId={vimeoVideoId}
					/>
				)}
			</div>
		</div>
	);
};

const HeroHomepage = ({ title, image, vimeoVideoId }: HeroHomepageType) => {
	const sectionRef = useRef<HTMLElement>(null);
	const imagePlaceholderRef = useRef<HTMLDivElement>(null);
	const { animationDelay } = useGlobalContext();

	useGSAP(
		() => {
			if (!animationDelay) return;

			gsap.from(`.${css.title} > span > span`, {
				y: "100%",
				stagger: 0.1,
				delay: animationDelay,
			});
		},
		{ dependencies: [animationDelay], scope: sectionRef },
	);
	if (!title) return <></>;

	const titleLines = title.split("\n");

	return (
		<section
			ref={sectionRef}
			className={css.block}
		>
			<div className={css.blockInner}>
				<Wrapper className={css.wrapper}>
					<h2 className={css.title}>
						{titleLines.map((line, i) => (
							<Fragment key={i}>
								{line.split("|").map((part, j) =>
									j === 0 ? (
										<span key={j}>
											<span>{part}</span>
										</span>
									) : (
										<Fragment key={j}>
											<ImagePlaceholder ref={imagePlaceholderRef} />
											<span>
												<span>{part}</span>
											</span>
										</Fragment>
									),
								)}
								{i < titleLines.length - 1 && <br />}
							</Fragment>
						))}
					</h2>
				</Wrapper>
			</div>
			<Media
				parentRef={sectionRef}
				image={image}
				vimeoVideoId={vimeoVideoId}
			/>
		</section>
	);
};

export default HeroHomepage;
