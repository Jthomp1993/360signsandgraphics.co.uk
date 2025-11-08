"use client";

import type { PrimaryHeader as PrimaryHeaderType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useTransitionState } from "next-transition-router";
import Link from "next/link";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

import Wrapper from "@components/Wrapper";
import { useGlobalContext } from "@context/GlobalProvider";
import useMediaQuery from "@hooks/useMediaQuery";
import getLinkProps from "@util/getLinkProps";
import getLinkTarget from "@util/getLinkTarget";
import getLinkUrl from "@util/getLinkUrl";
import leadZero from "@util/leadZero";
import toTitle from "@util/toTitle";

import css from "./index.module.css";

const PrimaryHeaderClient = (props: PrimaryHeaderType) => {
	const ref = useRef<HTMLElement>(null);
	const [navOpen, setNavOpen] = useState(false);
	const [isNavAnimated, setIsNavAnimated] = useState(false);
	const { copy1, copy2 } = props;
	const { navButton, setNavButton } = useGlobalContext();
	const { stage } = useTransitionState();

	// Block CSS
	const blockCSS = useCallback(() => {
		const styles = [css.block];
		if (navOpen) {
			styles.push(css.navOpen);
		}
		return styles.join(" ");
	}, [navOpen]);

	// Reset Nav Open on Path Change
	useEffect(() => {
		if (!ref.current || !navOpen || stage !== "leaving") return;

		ref.current.classList.remove(css.scrollDown);
		//ref.current.classList.remove(css.hide);
		ref.current.classList.remove(css.fixed);

		setNavOpen(false);
	}, [stage, navOpen]);

	// Scroll Events
	useGSAP(
		() => {
			if (!ref.current) return;

			ScrollTrigger.create({
				onUpdate: (self) => {
					if (!ref.current) return;

					if (window.scrollY > 50) {
						ref.current.classList.add(css.scrollDown);
					} else {
						ref.current.classList.remove(css.scrollDown);
						//ref.current.classList.remove(css.hide);
					}

					/* if (window.scrollY > 100) {
						if (self.direction > 0) {
							ref.current.classList.add(css.hide);
						} else {
							ref.current.classList.remove(css.hide);
						}
					} */
				},
			});
		},
		{ scope: ref },
	);

	// Disable Scroll when Nav is Open
	useEffect(() => {
		if (navOpen) {
			document.body.classList.add("scroll-disable");
		} else {
			document.body.classList.remove("scroll-disable");
		}
	}, [navOpen]);

	return (
		<>
			<header
				ref={ref}
				className={blockCSS()}
			>
				<Wrapper className={css.wrapper}>
					<Link
						href="/"
						className={css.logo}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="168"
							height="50"
							viewBox="0 0 1374 403"
							fill="none"
						>
							<path
								fill="currentColor"
								d="M124.07 192.16v71.9H60.14v-69.54l63.93-2.36ZM243.75 79.4 79.89 89.47V0H0v73.24h59.94v60.94l127.54-6.86.87 197.26H0v44.45h244.87L243.75 79.4Z"
							/>
							<g clipPath="url(#clip2_3461_990)">
								<path
									fill="currentColor"
									d="M333.81 111.63c12.12-2.5 22.75-3.75 31.88-3.75h6.56c8.5 0 15.31 2.56 20.44 7.69 5.12 5.13 7.69 11.94 7.69 20.44v43.13c0 9.38-2.66 16.72-7.97 22.03-5.31 5.31-12.66 7.97-22.03 7.97H301V77.88h32.81v33.75Zm33.75 28.12c0-1.88-.63-3.44-1.88-4.69-1.25-1.25-2.81-1.88-4.69-1.88h-4.69c-5.25 0-9.78.25-13.59.75-3.81.5-6.78.88-8.91 1.12v48.75h26.25c5 0 7.5-2.5 7.5-7.5v-36.56l.01.01Zm95.63 44.06c6.62 0 14.12-1.25 22.5-3.75v-70.31h32.81v99.38h-29.06l-1.88-9.38c-5.88 3.88-11.91 6.72-18.09 8.53-6.18 1.81-11.41 2.72-15.66 2.72h-8.44c-8.5 0-15.31-2.56-20.44-7.69-5.13-5.12-7.69-11.94-7.69-20.44v-73.12h32.81v67.5c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88h6.56l.01-.01ZM578.5 113.5v95.63h-32.81v-70.32h-14.06V113.5h46.88-.01ZM545.69 76h32.81v26.25h-32.81V76Zm102.19 133.13c-8.38 1.25-16.34 1.88-23.91 1.88s-13.91-2.56-19.03-7.69c-5.13-5.12-7.69-11.94-7.69-20.44v-105h32.81v100.31c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88h11.25v24.38-.01Zm83.44 0-1.88-9.38c-5.88 3.88-11.91 6.72-18.09 8.53-6.18 1.81-11.41 2.72-15.66 2.72h-8.44c-8.5 0-15.31-2.56-20.44-7.69-5.13-5.12-7.69-11.94-7.69-20.44v-43.13c0-9.38 2.65-16.72 7.97-22.03 5.31-5.31 12.66-7.97 22.03-7.97h38.44V77.88h32.81v131.25h-29.06.01Zm-26.25-25.32c6.62 0 14.12-1.25 22.5-3.75v-45h-28.12c-5 0-7.5 2.5-7.5 7.5v34.69c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88h6.56l-.01-.01Zm184.68 25.32c-12.13 1.25-24 1.88-35.63 1.88-8.5 0-15.31-2.56-20.44-7.69-5.13-5.12-7.69-11.94-7.69-20.44v-47.81h-11.25v-25.31h11.25l3.75-22.5h29.06v22.5h23.44v25.31H858.8v43.13c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88h24.38v24.38-.02Zm45.94-97.5c12.12-2.5 22.75-3.75 31.88-3.75h8.44c8.5 0 15.31 2.56 20.44 7.69 5.12 5.13 7.69 11.94 7.69 20.44v73.13h-32.81v-69.39c0-1.88-.63-3.44-1.88-4.69-1.25-1.25-2.81-1.88-4.69-1.88h-6.56c-4.75 0-9.09.25-13.03.75-3.94.5-7.1.88-9.47 1.12v74.06h-32.81V77.88h32.81v33.75h-.01Zm177.19 95.62c-24.13 2.5-46 3.75-65.63 3.75-8.5 0-15.31-2.56-20.44-7.69-5.13-5.12-7.69-11.94-7.69-20.44v-45c0-9.38 2.65-16.72 7.97-22.03 5.31-5.31 12.66-7.97 22.03-7.97h37.5c9.38 0 16.72 2.66 22.03 7.97 5.31 5.31 7.97 12.66 7.97 22.03v34.69h-64.69v7.5c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88 12.38 0 30.5-.94 54.38-2.81v23.44-.01Zm-53.44-75.94c-5 0-7.5 2.5-7.5 7.5v10.31h31.88v-10.31c0-5-2.5-7.5-7.5-7.5h-16.88ZM333.81 271.33c12.12-2.5 22.75-3.75 31.88-3.75h6.56c8.5 0 15.31 2.56 20.44 7.69 5.12 5.13 7.69 11.94 7.69 20.44v43.12c0 9.38-2.66 16.72-7.97 22.03-5.31 5.31-12.66 7.97-22.03 7.97H301V237.58h32.81v33.75Zm33.75 28.12c0-1.88-.63-3.44-1.88-4.69-1.25-1.25-2.81-1.88-4.69-1.88h-4.69c-5.25 0-9.78.25-13.59.75-3.81.5-6.78.88-8.91 1.12v48.75h26.25c5 0 7.5-2.5 7.5-7.5v-36.56l.01.01Zm54.38-28.12c22.88-2.5 43.5-3.75 61.88-3.75 8.5 0 15.31 2.56 20.44 7.69 5.12 5.13 7.69 11.94 7.69 20.44v73.13h-29.06l-1.88-9.38c-5.88 3.88-11.91 6.72-18.09 8.53-6.18 1.81-11.41 2.72-15.66 2.72h-6.56c-8.5 0-15.31-2.56-20.44-7.69-5.13-5.12-7.69-11.94-7.69-20.44v-8.44c0-8.5 2.56-15.31 7.69-20.44 5.13-5.13 11.94-7.69 20.44-7.69h38.44v-7.5c0-1.88-.63-3.44-1.88-4.69-1.25-1.25-2.81-1.88-4.69-1.88-8.13 0-17.09.38-26.91 1.12-9.81.75-17.72 1.31-23.72 1.69v-23.44.02Zm34.69 73.12c6.62 0 14.12-1.25 22.5-3.75v-11.25h-27.19c-1.88 0-3.44.63-4.69 1.88-1.25 1.25-1.88 2.81-1.88 4.69v1.88c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88h4.69v-.02Zm127.5-49.69c-6.63 0-14.13 1.25-22.5 3.75v70.31h-32.81v-99.38h29.06l1.88 9.38c5.87-3.87 11.91-6.72 18.09-8.53 6.19-1.81 11.41-2.72 15.66-2.72h8.44c8.5 0 15.31 2.56 20.44 7.69 5.12 5.13 7.69 11.94 7.69 20.44v73.13h-32.81v-67.5c0-1.88-.63-3.44-1.88-4.69-1.25-1.25-2.81-1.88-4.69-1.88H584.13Zm133.12 74.07-1.88-9.38c-5.88 3.88-11.91 6.72-18.09 8.53-6.18 1.81-11.41 2.72-15.66 2.72h-8.44c-8.5 0-15.31-2.56-20.44-7.69-5.13-5.12-7.69-11.94-7.69-20.44v-43.12c0-9.38 2.65-16.72 7.97-22.03 5.31-5.31 12.66-7.97 22.03-7.97h38.44v-31.88h32.81v131.25h-29.06l.01.01ZM691 343.51c6.62 0 14.12-1.25 22.5-3.75v-45h-28.12c-5 0-7.5 2.5-7.5 7.5v34.69c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88h6.56l-.01-.01Zm179.07-14.06 16.88-60h35.62l-30.94 99.38h-34.69l-18.75-60-18.75 60h-34.69l-30.94-99.38h35.63l16.88 60 16.88-60h30l16.88 60h-.01ZM931 271.33c22.88-2.5 43.5-3.75 61.88-3.75 8.5 0 15.31 2.56 20.44 7.69 5.12 5.13 7.69 11.94 7.69 20.44v73.13h-29.06l-1.88-9.38c-5.88 3.88-11.91 6.72-18.09 8.53-6.18 1.81-11.41 2.72-15.66 2.72h-6.56c-8.5 0-15.31-2.56-20.44-7.69-5.13-5.12-7.69-11.94-7.69-20.44v-8.44c0-8.5 2.56-15.31 7.69-20.44 5.13-5.13 11.94-7.69 20.44-7.69h38.44v-7.5c0-1.88-.63-3.44-1.88-4.69-1.25-1.25-2.81-1.88-4.69-1.88-8.13 0-17.09.38-26.91 1.12-9.81.75-17.72 1.31-23.72 1.69v-23.44.02Zm34.69 73.12c6.62 0 14.12-1.25 22.5-3.75v-11.25H961c-1.88 0-3.44.63-4.69 1.88-1.25 1.25-1.88 2.81-1.88 4.69v1.88c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88h4.69v-.02Zm136.88 16.88c-12.13 2.5-22.75 3.75-31.88 3.75h-6.56c-8.5 0-15.31-2.56-20.44-7.69-5.13-5.12-7.69-11.94-7.69-20.44v-37.5c0-9.38 2.65-16.72 7.97-22.03 5.31-5.31 12.66-7.97 22.03-7.97h69.38v105c0 8.5-2.56 15.31-7.69 20.44-5.13 5.12-11.94 7.69-20.44 7.69-19.63 0-41.5-1.25-65.63-3.75v-24.38c23.88 1.88 42 2.81 54.38 2.81 1.88 0 3.44-.63 4.69-1.88 1.25-1.25 1.88-2.81 1.88-4.69v-9.38.02Zm-22.5-21.57c7.88 0 15.38-.62 22.5-1.88v-43.12h-26.25c-5 0-7.5 2.5-7.5 7.5v30.94c0 1.88.62 3.44 1.88 4.69 1.25 1.25 2.81 1.88 4.69 1.88h4.69l-.01-.01Zm175.31.94c0 9.38-2.66 16.72-7.97 22.03-5.31 5.31-12.66 7.97-22.03 7.97h-43.13c-9.38 0-16.72-2.65-22.03-7.97-5.31-5.31-7.97-12.66-7.97-22.03v-43.12c0-9.38 2.65-16.72 7.97-22.03 5.31-5.31 12.66-7.97 22.03-7.97h43.13c9.38 0 16.72 2.66 22.03 7.97 5.31 5.31 7.97 12.66 7.97 22.03v43.12Zm-32.81-40.31c0-5-2.5-7.5-7.5-7.5h-22.5c-5 0-7.5 2.5-7.5 7.5v37.5c0 5 2.5 7.5 7.5 7.5h22.5c5 0 7.5-2.5 7.5-7.5v-37.5Zm105-5.63c-6.63 0-14.13 1.25-22.5 3.75v70.31h-32.81v-99.38h29.06l1.88 9.38c5.87-3.87 11.91-6.72 18.09-8.53 6.19-1.81 11.41-2.72 15.66-2.72h8.44c8.5 0 15.31 2.56 20.44 7.69 5.12 5.13 7.69 11.94 7.69 20.44v73.13h-32.81v-67.5c0-1.88-.63-3.44-1.88-4.69-1.25-1.25-2.81-1.88-4.69-1.88H1327.57Z"
								/>
							</g>
							<defs>
								<clipPath id="clip2_3461_990">
									<rect
										width="1072.51"
										height="326.58"
										fill="currentColor"
										transform="translate(301 76)"
									/>
								</clipPath>
							</defs>
						</svg>
					</Link>
					<DesktopCopy
						copy1={copy1}
						copy2={copy2}
						navOpen={navOpen}
					/>

					<button
						aria-expanded={
							navOpen || (navButton !== null ? !!navButton : undefined)
						}
						aria-controls="primary-nav"
						className={css.navButton}
						onClick={() =>
							!isNavAnimated &&
							(navButton !== null
								? setNavButton(false)
								: setNavOpen((prev) => !prev))
						}
					>
						<span data-label={"CLOSE"}>
							<span>MENU</span>
						</span>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M15 9V0H9V9H0V15H9V24H15V15H24V9H15Z"
								fill="currentColor"
							/>
						</svg>
					</button>
				</Wrapper>
			</header>

			<Megamenu
				{...props}
				navOpen={navOpen}
				setIsNavAnimated={setIsNavAnimated}
			/>
		</>
	);
};

const DesktopCopy = ({
	copy1,
	copy2,
	navOpen,
	ref = createRef<HTMLDivElement>(),
}: Pick<PrimaryHeaderType, "copy1" | "copy2"> & {
	navOpen: boolean;
	ref?: React.RefObject<HTMLDivElement | null>;
}) => {
	const isMdUp = useMediaQuery("mdUp");
	const copiesTl = useRef<gsap.core.Timeline | null>(null);

	// Copy Animation
	const onCopyEnter = useCallback(() => {
		if ((!copy1 && !copy2) || !isMdUp) return;

		const copies = gsap.utils.toArray<HTMLElement>(`.${css.copy}`, ref.current);

		copiesTl.current = gsap.timeline();

		copies.forEach((copy) => {
			const splitText = new SplitText(copy, {
				type: "lines, words",
				linesClass: "split-line",
				wordsClass: "split-word",
			});

			gsap.set(splitText.words, { yPercent: 100 });

			copiesTl.current?.to(
				splitText.words,
				{
					yPercent: 0,
					duration: 0.4,
					stagger: 0.01,
					ease: "power3.out",
				},
				"<50%",
			);
		});

		return () => {
			copiesTl.current?.kill();
		};
	}, [copy1, copy2, isMdUp]);

	const onCopyExit = useCallback(() => {
		if (!copiesTl.current) return;

		copiesTl.current.reverse();
	}, []);

	if (!copy1 && !copy2) return null;

	return (
		<Transition
			in={navOpen && isMdUp}
			nodeRef={ref}
			timeout={700}
			onEnter={onCopyEnter}
			onExit={onCopyExit}
			mountOnEnter
			unmountOnExit
		>
			<div
				ref={ref}
				className={css.copyContainer}
			>
				{copy1 && (
					<div className={`${css.copy} ${css.copy1}`}>{toTitle(copy1)}</div>
				)}
				{copy2 && (
					<div className={`${css.copy} ${css.copy2}`}>{toTitle(copy2)}</div>
				)}
			</div>
		</Transition>
	);
};

const Megamenu = ({
	navigation,
	navOpen,
	sideNavigation,
	copy1,
	copy2,
	ref = createRef<HTMLDivElement>(),
	setIsNavAnimated,
}: Pick<
	PrimaryHeaderType,
	"navigation" | "sideNavigation" | "copy1" | "copy2"
> & {
	navOpen: boolean;
	ref?: React.RefObject<HTMLDivElement | null>;
	setIsNavAnimated: (isNavAnimated: boolean) => void;
}) => {
	const isMdUp = useMediaQuery("mdUp");

	// Pause ScrollSmoother when Nav is Open
	useEffect(() => {
		if (typeof window === "undefined" || !window.smoother) return;

		window.smoother.paused(navOpen);
	}, [navOpen]);

	const onNavEnter = useCallback(() => {
		if (!ref.current) return;

		const navEls = gsap.utils.toArray<HTMLElement>(
			`.${css.navigation} li`,
			ref.current,
		);
		const sideNavEls = gsap.utils.toArray<HTMLElement>(
			`.${css.sideNav} li a`,
			ref.current,
		);
		const copyEls = gsap.utils.toArray<HTMLElement>(
			`.${css.copy} div`,
			ref.current,
		);

		const navTlRef = gsap.timeline({
			onStart: () => {
				setIsNavAnimated(true);
			},
			onComplete: () => {
				setIsNavAnimated(false);
			},
		});

		navTlRef.from(ref.current, {
			opacity: 0,
			duration: 0.6,
			ease: "power3.in",
		});

		navTlRef.to(
			navEls,
			{
				x: 0,
				"--clip-path": "0% 0%, 100% 0%, 100% 100%, 0% 100%",
				stagger: 0.1,
				duration: 1.4,
				ease: "elastic.out(2,.8)",
			},
			"<50%",
		);

		sideNavEls.length > 0 &&
			navTlRef.from(
				sideNavEls,
				{
					y: "100%",
					rotate: -3,
					stagger: 0.1,
					duration: 1.5,
					ease: "elastic.out(1,0.5)",
				},
				"<",
			);

		copyEls.length > 0 &&
			navTlRef.from(
				copyEls,
				{
					opacity: 0,
					stagger: 0.1,
					duration: 0.6,
					ease: "power3.in",
				},
				"<50%",
			);

		return () => {
			navTlRef.kill();
		};
	}, [copy1, copy2, isMdUp, setIsNavAnimated]);

	const onNavExit = useCallback(() => {
		if (!ref.current) return;

		const navEls = gsap.utils.toArray<HTMLElement>(
			`.${css.navigation} li`,
			ref.current,
		);
		const sideNavEls = gsap.utils.toArray<HTMLElement>(
			`.${css.sideNav} li a`,
			ref.current,
		);
		const copyEls = gsap.utils.toArray<HTMLElement>(
			`.${css.copy} div`,
			ref.current,
		);

		const navTlRef = gsap.timeline({
			onStart: () => {
				setIsNavAnimated(true);
			},
			onComplete: () => {
				setIsNavAnimated(false);
			},
		});

		copyEls.length > 0 &&
			navTlRef.to(copyEls, {
				opacity: 0,
				stagger: 0.1,
				duration: 0.6,
				ease: "power3.out",
			});

		sideNavEls.length > 0 &&
			navTlRef.to(
				sideNavEls,
				{
					y: "-100%",
					rotate: 10,
					stagger: 0.1,
					duration: 0.6,
					ease: "power3.out",
				},
				"<",
			);

		navTlRef.to(
			navEls,
			{
				x: 0,
				"--clip-path": "0% 0%, 0% 0%, 0% 100%, 0% 100%",
				stagger: 0.1,
				duration: 0.6,
				ease: "power3.out",
			},
			"<",
		);

		navTlRef.to(ref.current, {
			opacity: 0,
			duration: 0.6,
			ease: "power3.out",
		});

		return () => {
			navTlRef.kill();
		};
	}, [setIsNavAnimated]);

	return (
		<Transition
			nodeRef={ref}
			in={navOpen}
			timeout={1000}
			mountOnEnter
			unmountOnExit
			onEnter={onNavEnter}
			onExit={onNavExit}
		>
			<div
				ref={ref}
				className={`${css.megamenu}`}
			>
				<Wrapper className={css.wrapper}>
					<nav className={css.navigation}>
						<ul>
							{navigation.map((item, idx) => (
								<li key={idx}>
									<Link
										href={getLinkUrl(item.link)}
										target={getLinkTarget(item.link)}
									>
										<em data-num={leadZero(idx + 1)}>
											<span>{leadZero(idx + 1)}</span>
										</em>
										<span data-label={item.link.label}>
											<span>{item.link.label}</span>
										</span>
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className={css.rightCol}>
						{sideNavigation && (
							<ul className={css.sideNav}>
								{sideNavigation.map((item, idx) => (
									<li key={idx}>
										<Link {...getLinkProps(item.link)}>
											<span data-label={item.link.label}>
												<span>{item.link.label}</span>
											</span>
										</Link>
									</li>
								))}
							</ul>
						)}
						{(copy1 || copy2) && !isMdUp && (
							<div className={css.copy}>
								{copy1 && <div className={css.copy1}>{toTitle(copy1)}</div>}
								{copy2 && <div className={css.copy2}>{toTitle(copy2)}</div>}
							</div>
						)}
					</div>
				</Wrapper>
			</div>
		</Transition>
	);
};

export default PrimaryHeaderClient;
