"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import css from "./index.module.css";

// Define SVG paths outside the component to avoid recreating them on each render
const PLAY_PATH = "M8,5.14V18.86L19,12L8,5.14";
const PAUSE_PATH = "M7,5.14H11V18.86H7V5.14 M13,5.14H17V18.86H13V5.14";
const CROSS_PATH = "M14.9116 12.728L19.6841 7.95557L16.5021 4.77359L11.7296 9.54605L6.95605 4.77246L3.77407 7.95444L8.54766 12.728L3.77418 17.5015L6.95616 20.6835L11.7296 15.91L16.502 20.6824L19.684 17.5004L14.9116 12.728Z";


const CustomCursor = () => {
	const cursorRef = useRef<HTMLDivElement>(null);
	const iconPathRef = useRef<SVGPathElement>(null);
	const tlPlayPause = useRef<gsap.core.Timeline | null>(null);
	const tlCross = useRef<gsap.core.Timeline | null>(null);

	const [isVisible, setIsVisible] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [cursorType, setCursorType] = useState<"play" | "pause" | "cross">("play");
	const [cursorTargetElement, setCursorTargetElement] =
		useState<HTMLElement | null>(null);
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	// Detect touch device on component mount
	useEffect(() => {
		// Check if device supports touch events
		const isTouchSupported = 
			'ontouchstart' in window || 
			navigator.maxTouchPoints > 0 ||
			(navigator as any).msMaxTouchPoints > 0;
		
		setIsTouchDevice(isTouchSupported);
		
		// Also disable custom cursor if user is actually using touch
		const handleTouchStart = () => {
			setIsTouchDevice(true);
			// Clean up event listener after first touch
			window.removeEventListener('touchstart', handleTouchStart);
		};
		
		// Add passive event listener to prevent scroll blocking
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		
		return () => {
			window.removeEventListener('touchstart', handleTouchStart);
		};
	}, []);

	// Initialize the GSAP timelines for morphing between cursor types
	useGSAP(() => {
		if (!iconPathRef.current || isTouchDevice) return;

		// Timeline for play/pause transitions
		tlPlayPause.current = gsap
			.timeline({
				paused: true,
				defaults: {
					duration: 0.4,
					ease: "power2.inOut",
				},
			})
			.to(iconPathRef.current, {
				morphSVG: PAUSE_PATH,
			});
			
		// Timeline for transitioning to cross
		tlCross.current = gsap
			.timeline({
				paused: true,
				defaults: {
					duration: 0.4,
					ease: "power2.inOut",
				},
			})
			.to(iconPathRef.current, {
				morphSVG: CROSS_PATH,
				stroke: "currentColor",
			});
	}, [isTouchDevice]);

	// Handle all mouse interactions in a single effect
	useEffect(() => {
		if (!cursorRef.current || isTouchDevice) return;

		const handleMouseMove = (e: MouseEvent) => {
			if (!cursorRef.current) return;

			// 1. Update cursor position
			const x = e.clientX;
			const y = e.clientY;
			gsap.set(cursorRef.current, { x, y });

			// 2. Check for data-cursor attribute
			let target = e.target as HTMLElement;
			let hasCursor = false;
			let cursorElement = null;

			while (target && target !== document.body) {
				if (target.hasAttribute("data-cursor")) {
					hasCursor = true;
					cursorElement = target;
					break;
				}
				target = target.parentElement as HTMLElement;
			}

			// 3. Update visibility state
			setIsVisible(hasCursor);
			setCursorTargetElement(hasCursor ? cursorElement : null);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [isTouchDevice]);

	// Update cursor type based on cursor target
	useEffect(() => {
		if (!cursorTargetElement || isTouchDevice) return;

		const checkCursorType = () => {
			const dataCursorValue = cursorTargetElement.getAttribute("data-cursor");
			
			if (dataCursorValue === "cross") {
				setCursorType("cross");
				setIsPlaying(false);
			} else {
				const newIsPlaying = dataCursorValue !== "play";
				setCursorType(newIsPlaying ? "pause" : "play");
				setIsPlaying(newIsPlaying);
			}
		};

		// Initial check
		checkCursorType();

		// Set up mutation observer to detect attribute changes
		const observer = new MutationObserver(checkCursorType);
		observer.observe(cursorTargetElement, {
			attributes: true,
			attributeFilter: ["data-cursor"],
		});

		const handleMouseLeave = () => {
			setIsVisible(false);
		};

		cursorTargetElement.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			observer.disconnect();
			cursorTargetElement.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [cursorTargetElement, isTouchDevice]);

	// Handle cursor visibility animation
	useGSAP(() => {
		if (!cursorRef.current || isTouchDevice) return;

		gsap.to(cursorRef.current, {
			opacity: isVisible ? 1 : 0,
			duration: 0.2,
		});
	}, [isVisible, isTouchDevice]);

	// Handle play/pause and cross animations
	useEffect(() => {
		if (!tlPlayPause.current || !tlCross.current || isTouchDevice) return;

		if (cursorType === "cross") {
			// Reset play/pause timeline first if needed
			if (isPlaying) {
				tlPlayPause.current.reverse();
			}
			
			// Show cross cursor
			tlCross.current.play();
		} else {
			// Hide cross cursor first
			tlCross.current.reverse();
			
			// Then handle play/pause state
			if (isPlaying) {
				tlPlayPause.current.play();
			} else {
				tlPlayPause.current.reverse();
			}
		}
	}, [isPlaying, cursorType, isTouchDevice]);

	// Don't render anything on touch devices
	if (isTouchDevice) {
		return null;
	}

	return (
		<div
			ref={cursorRef}
			className={css.cursorButton}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					ref={iconPathRef}
					d={PLAY_PATH}
					fill="currentColor"
				/>
			</svg>
		</div>
	);
};

export default CustomCursor;
