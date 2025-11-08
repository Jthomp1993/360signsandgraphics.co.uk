"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import css from "./index.module.css";

/* 

Decode video before uploading

ffmpeg -i originalVideoScrub.mp4 -vf scale=1920:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p videoScrub.mp4 

*/

const VideoScrub: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [videoLoaded, setVideoLoaded] = useState(false);
	const reverse = false;

	useEffect(() => {
		if (!videoRef.current) return;

		const handleLoadedMetadata = () => {
			setVideoLoaded(true);
			videoRef.current?.play();
			videoRef.current?.pause();
			videoRef.current && (videoRef.current.currentTime = 0);
		};

		videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

		return () => {
			videoRef.current?.removeEventListener(
				"loadedmetadata",
				handleLoadedMetadata,
			);
		};
	}, []);

	useEffect(() => {
		const loadVideo = () => {
			if (videoRef.current && !videoRef.current?.src) {
				videoRef.current.src = "/videos/videoScrub.mp4";
				videoRef.current.load();
			}
		};

		// Set up event listeners for user interaction
		window.addEventListener("scroll", loadVideo);
		window.addEventListener("mousemove", loadVideo);
		window.addEventListener("touchstart", loadVideo);

		return () => {
			// Cleanup event listeners
			window.removeEventListener("scroll", loadVideo);
			window.removeEventListener("mousemove", loadVideo);
			window.removeEventListener("touchstart", loadVideo);
		};
	}, [videoLoaded]);

	useGSAP(
		() => {
			if (!videoLoaded) return;

			const tl = gsap.timeline({
				defaults: {
					ease: "none",
				},
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: () => `bottom+=${window.innerHeight} bottom`,
					//end: "bottom top",
					scrub: true,
					pin: `.${css.videoContainer}`,
					pinSpacing: false,
				},
			});

			tl.fromTo(
				`video`,
				{
					currentTime: reverse ? videoRef.current?.duration : 0.1,
					immediateRender: true,
				},
				{
					currentTime: reverse ? 0.1 : videoRef.current?.duration,
				},
			);

			tl.to(`video`, {
				//delay: .1,
				duration: 0.3,
			});
		},
		{ scope: ref, dependencies: [videoLoaded] },
	);

	return (
		<section
			ref={ref}
			className={css.block}
		>
			<div className={css.videoContainer}>
				<video
					ref={videoRef}
					className={css.video}
					muted
					playsInline
					preload="none"
				/>
			</div>
		</section>
	);
};

export default VideoScrub;
