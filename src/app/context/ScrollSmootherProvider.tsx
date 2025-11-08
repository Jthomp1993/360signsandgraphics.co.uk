"use client";

import { useGSAP } from "@gsap/react";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import { createContext, use, useRef, useState } from "react";

import useMediaQuery from "@hooks/useMediaQuery";

export type ScrollSmootherContext = ScrollSmoother | null;

export const ScrollSmootherContext = createContext<ScrollSmootherContext>(null);

const ScrollSmootherProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const smootherRef = useRef<ScrollSmoother>(null);
	const [smootherInstance, setSmootherInstance] =
		useState<ScrollSmoother | null>(null);
	const isTouch = useMediaQuery("(hover: none)");

	useGSAP(() => {
		smootherRef.current = ScrollSmoother.create({
			smooth: 1,
			normalizeScroll: true,
			effects: true,
			smoothTouch: 1,
			ignoreMobileResize: true,
		});

		window.smoother = smootherRef.current;
		setSmootherInstance(smootherRef.current);
	}, [isTouch]);

	return (
		<ScrollSmootherContext.Provider value={smootherInstance}>
			{children}
		</ScrollSmootherContext.Provider>
	);
};

export const useScrollSmoother = () => {
	return use(ScrollSmootherContext);
};

export default ScrollSmootherProvider;
