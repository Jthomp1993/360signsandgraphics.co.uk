import Player from "@vimeo/player";
import { useEffect, useRef, useState } from "react";

import css from "./index.module.css";

export type VimeoVideoProps = {
	videoId: string;
	autoplay?: boolean;
	muted?: boolean;
	className?: string;
	loop?: boolean;
	controls?: boolean;
	responsive?: boolean;
	ref?: React.RefObject<HTMLDivElement | null>;
	setPlayer?: (player: Player | null) => void;
};

export const VimeoVideo = ({
	videoId,
	ref: externalRef,
	autoplay = true,
	muted = true,
	className = "",
	loop = true,
	controls = false,
	responsive = false,
	setPlayer,
}: VimeoVideoProps) => {
	const observerRef = useRef<IntersectionObserver | null>(null);

	const internalRef = useRef<HTMLDivElement>(null);
	const internalVimeoRef = useRef<Player | null>(null);

	const [isMuted, setIsMuted] = useState(muted);
	const [userHasInteracted, setUserHasInteracted] = useState(false);

	const ref = externalRef || internalRef;

	const blockCSS = [css.vimeoPlayer];

	if (className) {
		blockCSS.push(className);
	}

	// Track user interaction to prevent autoplay on page load
	useEffect(() => {
		const handleUserInteraction = () => {
			setUserHasInteracted(true);
		};

		window.addEventListener("mousemove", handleUserInteraction);
		window.addEventListener("touchstart", handleUserInteraction);
		window.addEventListener("scroll", handleUserInteraction);

		return () => {
			window.removeEventListener("mousemove", handleUserInteraction);
			window.removeEventListener("touchstart", handleUserInteraction);
			window.removeEventListener("scroll", handleUserInteraction);
		};
	}, []);

	// Initialize Vimeo player
	useEffect(() => {
		if (!ref.current || !userHasInteracted) return;

		// Initialize Vimeo player
		const player = new Player(ref.current, {
			id: parseInt(videoId, 10),
			autoplay,
			muted,
			loop,
			controls,
			responsive,
		});

		// Get initial muted state from player
		player.getMuted().then((mutedState) => {
			setIsMuted(mutedState);
		});

		// Update internal ref
		internalVimeoRef.current = player;

		// If external ref was provided, update it
		setPlayer && setPlayer(player);

		// Clean up on unmount
		return () => {
			player.destroy();

			setPlayer && setPlayer(null);

			internalVimeoRef.current = null;
		};
	}, [
		videoId,
		autoplay,
		muted,
		loop,
		controls,
		responsive,
		setPlayer,
		userHasInteracted,
	]);

	// Set up Intersection Observer for autopause when out of viewport
	useEffect(() => {
		const player = internalVimeoRef.current;
		if (!player) return;

		// Set up Intersection Observer for autopause when out of viewport
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Video is in viewport, play if it was autoplay and muted
					if (autoplay && isMuted) {
						player.play();
					}
				} else {
					// Video is out of viewport, pause it
					player.pause();
				}
			});
		});

		if (ref.current) {
			observer.observe(ref.current);
		}

		observerRef.current = observer;

		return () => {
			observer.disconnect();
		};
	}, [autoplay, isMuted]);

	return (
		<div
			ref={ref}
			className={blockCSS.join(" ")}
		/>
	);
};

export default VimeoVideo;
