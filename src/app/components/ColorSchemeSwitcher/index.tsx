"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const ColorSchemeSwitcher = () => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		// Set up Intersection Observer to detect elements with data-light-scheme
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Element with data-light-scheme is in viewport
						document.documentElement.classList.add("light-scheme");
					} else {
						// Element is out of viewport
						document.documentElement.classList.remove("light-scheme");
					}
				});
			},
			{
				rootMargin: `-${window.innerHeight / 2}px 0px`,
			},
		);

		// Find all elements with data-light-scheme attribute
		const lightSchemeElements = document.querySelectorAll(
			"[data-light-scheme]",
		);

		// Observe each element
		lightSchemeElements.forEach((element) => {
			observer.observe(element);
		});

		// Store observer reference
		observerRef.current = observer;

		// Clean up on unmount
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [pathname]);

	// This component doesn't render anything visible
	return null;
};

export default ColorSchemeSwitcher;
