"use client";

import type { TitleBlock as TitleBlockType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import Player from "@vimeo/player";
import gsap from "gsap";
import parse from "html-react-parser";
import Image from "next/image";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import Transition from "react-transition-group/Transition";

import VimeoVideo from "@components/VimeoVideo";
import Wrapper from "@components/Wrapper";
import { useScrollSmoother } from "@context/ScrollSmootherProvider";

import Play from "./Play";
import css from "./index.module.css";

const VideoPlayButton: React.FC<{
	setIsOpen: (open: boolean) => void;
}> = ({ setIsOpen }) => {
	return (
		<div
			className={css.videoPlayButton}
			onClick={() => setIsOpen(true)}
		>
			<Play />
		</div>
	);
};

const VideoModal: React.FC<
	NonNullable<TitleBlockType["video"]> & {
		isOpen: boolean;
		setIsOpen: (open: boolean) => void;
	}
> = ({ vimeoVideoId, marqueeText, isOpen, setIsOpen }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [player, setPlayer] = useState<Player | null>(null);
	const smoother = useScrollSmoother();

	const onEnter = useCallback(() => {
		smoother?.paused(true);

		gsap.set(ref.current, {
			y: () => window.scrollY,
		});

		const tween = gsap.from(ref.current, {
			opacity: 0,
		});

		return () => {
			tween.kill();
		};
	}, [smoother]);

	const onExit = useCallback(() => {
		const tween = gsap.to(ref.current, {
			opacity: 0,
			onComplete: () => {
				smoother?.paused(false);
			},
		});

		return () => {
			tween.kill();
		};
	}, [smoother]);

	useGSAP(
		() => {
			if (!player) return;

			const tween = gsap.to(`.${css.marqueeText}`, {
				autoAlpha: 1,
				paused: true,
			});

			player.ready().then(() => {
				tween.play();
			});
		},
		{ scope: ref, dependencies: [player] },
	);

	return (
		<Transition
			nodeRef={ref}
			in={isOpen}
			timeout={500}
			onEnter={onEnter}
			onExit={onExit}
			unmountOnExit
		>
			<div
				ref={ref}
				className={css.videoModal}
				data-cursor={"cross"}
				onClick={() => setIsOpen(false)}
			>
				<div className={css.videoModalContent}>
					{vimeoVideoId && (
						<VimeoVideo
							setPlayer={setPlayer}
							className={css.vimeoVideo}
							videoId={vimeoVideoId}
						/>
					)}
					{marqueeText && (
						<div className={css.marqueeText}>
							{Array(5)
								.fill(0)
								.map((_, idx) => (
									<div
										key={idx}
										style={{ "--length": marqueeText.length } as CSSProperties}
									>
										{marqueeText}
										<span></span>
									</div>
								))}
						</div>
					)}
				</div>
			</div>
		</Transition>
	);
};

const TitleBlock: React.FC<TitleBlockType> = ({
	titleLine1,
	titleLine2,
	imageLine1,
	image1Line2,
	image2Line2,
	video,
}) => {
	const ref = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ref.current,
					start: "top 55%",
				},
			});

			(titleLine1 || titleLine2) &&
				gsap.set(`.${css.title}`, {
					clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
				});

			gsap.set(`img`, {
				clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
			});

			video &&
				video.vimeoVideoId &&
				gsap.set(`.${css.videoPlayButton}`, {
					x: "100%",
					rotate: 90,
					opacity: 0,
				});

			titleLine1 &&
				tl.to(`.${css.line1} .${css.title}`, {
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					duration: 1,
					ease: "power2.out",
				});

			tl.to(
				`img`,
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					stagger: 0.3,
					duration: 2,
					ease: "power2.out",
				},
				"<50%",
			);

			titleLine2 &&
				tl.to(
					`.${css.line2} .${css.title}`,
					{
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
						duration: 1,
						ease: "power2.out",
					},
					"<60%",
				);

			if (video && video.vimeoVideoId) {
				tl.to(
					`.${css.videoPlayButton}`,
					{
						rotate: 0,
						x: '50%',
						opacity: 1,
						duration: 1,
						ease: "power2.out",
					},
					"<60%",
				);
			}
		},
		{ scope: ref, dependencies: [video, titleLine1, titleLine2] },
	);
	return (
		<section
			ref={ref}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				<div className={css.line1}>
					<div className={css.title}>{titleLine1}</div>
					{imageLine1 && typeof imageLine1 === "object" && imageLine1.url && (
						<Image
							src={imageLine1.url}
							alt={imageLine1.alt || ""}
							width={900}
							height={600}
						/>
					)}
					{video && video.vimeoVideoId && (
						<VideoPlayButton setIsOpen={setIsOpen} />
					)}
				</div>
				<div className={css.line2}>
					{image1Line2 &&
						typeof image1Line2 === "object" &&
						image1Line2.url && (
							<Image
								className={css.image1}
								src={image1Line2.url}
								alt={image1Line2.alt || ""}
								width={550}
								height={550}
							/>
						)}
					{image2Line2 &&
						typeof image2Line2 === "object" &&
						image2Line2.url && (
							<Image
								className={css.image2}
								src={image2Line2.url}
								alt={image2Line2.alt || ""}
								width={700}
								height={400}
							/>
						)}
					<div className={css.title}>{titleLine2}</div>
				</div>
			</Wrapper>

			<VideoModal
				{...video}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</section>
	);
};

export default TitleBlock;
