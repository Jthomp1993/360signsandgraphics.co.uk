"use client";

import type { SitewideContent } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import Wrapper from "@components/Wrapper";
import { useScrollSmoother } from "@context/ScrollSmootherProvider";
import useMediaQuery from "@hooks/useMediaQuery";
import getLinkProps from "@util/getLinkProps";

import css from "./index.module.css";
import { usePathname } from "next/navigation";

const ButtonIcon = () => {
	return (
		<svg
			width="18"
			height="17"
			viewBox="0 0 18 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2.57371 16.7466L0.577148 14.75L12.4053 2.92188H1.90184V0.078125H17.2456V15.4219H14.4018V4.91844L2.57371 16.7466Z"
				fill="currentColor"
			/>
		</svg>
	);
};

const BackToTop = () => {
	const smoother = useScrollSmoother();

	return (
		<button
			className={css.backToTop}
			onClick={() => smoother && smoother.scrollTo(0, true)}
		>
			<span>There's nowt left - send me back t'top!</span>
			<i>
				<span>
					<ButtonIcon />
					<ButtonIcon />
				</span>
			</i>
		</button>
	);
};

export default function PrimaryFooterClient({
	socialLinks,
	footer: {
		navigation,
		copyrightHTML,
		devCopyrightHTML,
		contacts: { label: contactsLabel, items: contactsItems },
	},
}: SitewideContent) {
	const ref = useRef<HTMLElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	const isMdUp = useMediaQuery("mdUp");

	useGSAP(
		() => {
			gsap.fromTo(
				`.${css.wrapper}`,
				{
					y: () =>
						`-${Math.min(window.innerHeight, wrapperRef.current?.offsetHeight ?? 0)}px`,
				},
				{
					y: 0,
					ease: "none",
					scrollTrigger: {
						trigger: ref.current,
						start: () => `top bottom`,
						end: () =>
							`${Math.min(window.innerHeight, wrapperRef.current?.offsetHeight ?? 0)}px bottom`,
						scrub: true,
					},
				},
			);
		},
		{ scope: ref, revertOnUpdate: true, dependencies: [pathname] },
	);

	return (
		<footer
			ref={ref}
			className={css.block}
		>
			<Wrapper
				ref={wrapperRef}
				className={css.wrapper}
			>
				<div className={css.top}>
					<div className={css.bigTitle}>Can you feel it too?</div>
					{isMdUp && (
						<Link
							href="/"
							className={css.logo}
						>
							<Image
								src="/logo-sm.png"
								alt="Build The Bandwagon"
								width={100}
								height={100}
							/>
						</Link>
					)}
				</div>
				<div className={css.main}>
					<div className={css.contacts}>
						{contactsLabel && (
							<h6 className={css.contactsLabel}>{contactsLabel}</h6>
						)}
						{contactsItems && contactsItems.length > 0 && (
							<div className={css.contactsRows}>
								{contactsItems.map(
									({ label, valueHTML }, idx) =>
										valueHTML && (
											<div
												key={idx}
												className={css.contactsRow}
											>
												<div className={css.contactsRowLabel}>{label}</div>
												<div className={css.contactsRowValue}>
													{parse(valueHTML)}
												</div>
											</div>
										),
								)}
							</div>
						)}
					</div>
					<div className={css.mainRight}>
						{navigation && navigation.length > 0 && (
							<nav className={css.nav}>
								<h6 className={css.navLabel}>Quick Links</h6>
								<ul className={css.navList}>
									{navigation.map(({ link }, idx) => (
										<li key={idx}>
											<Link
												{...getLinkProps(link)}
												data-text={link.label}
											>
												<span>{link.label}</span>
											</Link>
										</li>
									))}
								</ul>
							</nav>
						)}
						{socialLinks && socialLinks.length > 0 && (
							<div className={css.social}>
								<h6 className={css.socialLabel}>Connect</h6>
								<ul className={css.socialList}>
									{socialLinks.map(
										({ socialNetwork, url }, idx) =>
											url && (
												<li key={idx}>
													<Link
														href={url}
														target="_blank"
														rel="noopener noreferrer"
														data-text={socialNetwork}
													>
														<span>{socialNetwork}</span>
													</Link>
												</li>
											),
									)}
								</ul>
							</div>
						)}
						<BackToTop />
					</div>
				</div>
				<div className={css.bottom}>
					{copyrightHTML && (
						<div className={css.copyright}>{parse(copyrightHTML)}</div>
					)}
					{devCopyrightHTML && (
						<div className={css.devCopyright}>{parse(devCopyrightHTML)}</div>
					)}
				</div>
			</Wrapper>
		</footer>
	);
}
