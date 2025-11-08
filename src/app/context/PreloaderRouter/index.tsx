"use client";

import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TransitionRouter } from "next-transition-router";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Wrapper from "@components/Wrapper";
import { useScrollSmoother } from "@context/ScrollSmootherProvider";

import css from "./index.module.css";

const PreloaderRouter = ({ children }: { children: React.ReactNode }) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const smoother = useScrollSmoother();

	useEffect(() => {
		smoother && smoother.scrollTo(0, false);
		window.scrollTo(0, 0);
	}, []);

	return (
		<TransitionRouter
			auto={true}
			leave={(next) => {
				const tl = gsap
					.timeline({
						onComplete: () => {
							smoother && smoother.scrollTo(0, false);

							next();
						},
					})
					.fromTo(
						overlayRef.current,
						{
							y: "100%",
						},
						{
							y: 0,
							duration: 0.8,
							delay: 0.3,
							ease: "circ.inOut",
						},
					);

				return () => {
					tl.kill();
				};
			}}
			enter={(next) => {
				const tl = gsap
					.timeline()
					.fromTo(
						overlayRef.current,
						{
							y: 0,
						},
						{
							y: "-100%",
							duration: 0.8,
							ease: "power2.inOut",
						},
					)
					.call(next, undefined, "<50%");

				return () => {
					tl.kill();
				};
			}}
		>
			<OverlayComponent ref={overlayRef} />
			{children}
		</TransitionRouter>
	);
};

type OverlayProps = {
	ref: RefObject<HTMLDivElement | null>;
};

const OverlayComponent = ({ ref }: OverlayProps) => {
	const [loaded, setLoaded] = useState(
		process.env.NEXT_PUBLIC_VERCEL_ENV === "localdevelopment",
	);
	const blockCSS = [css.overlay];

	if (loaded) {
		blockCSS.push(css.loaded);
	}

	// First load
	useGSAP(
		() => {
			if (loaded || !ref.current) return;

			const titleLines = gsap.utils.toArray<HTMLSpanElement>(
				`.${css.titleLine} span`,
			);

			const tl = gsap.timeline({
				onComplete: () => {
					setLoaded(true);
				},
			});

			titleLines.forEach((line, index) => {
				tl.to(
					line,
					{
						y: "0%",
						duration: 1.5,
						delay: index == 2 ? 0.3 : 0,
						ease: "elastic.out(1, 0.5)",
					},
					"<40%",
				);
			});

			tl.to(
				`.${css.logo} img`,
				{
					x: "0%",
					duration: 1.5,
					ease: "elastic.out(1, 0.7)",
				},
				"<10%",
			);

			tl.to(
				titleLines,
				{
					y: "-100%",
					duration: 0.6,
					ease: "power2.in",
				},
				"+=.5",
			);

			tl.to(
				`.${css.logo} img`,
				{
					x: "150%",
					duration: 0.6,
					ease: "power2.in",
				},
				"<",
			);

			tl.to(ref.current, {
				opacity: 0,
				duration: 0.4,
				ease: "power2.in",
			});
		},
		{ dependencies: [loaded], scope: ref },
	);

	return (
		<div
			ref={ref}
			className={blockCSS.join(" ")}
		>
			{!loaded && (
				<Wrapper className={css.wrapper}>
					<div className={css.wrapperInner}>
						<div className={css.title}>
							<span className={css.titleLine}>
								<span>Don't follow</span>
							</span>
							<span className={css.titleLine}>
								<span>the trend.</span>
							</span>
							<span className={css.titleLine}>
								<span>Build It!</span>
							</span>
						</div>
						<div className={css.logo}>
							<Image
								src="/logo.png"
								alt="logo"
								width={168}
								height={50}
								priority
							/>
						</div>
					</div>
				</Wrapper>
			)}
		</div>
	);
};

export default PreloaderRouter;
