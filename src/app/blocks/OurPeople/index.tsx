"use client";

import type { OurPeople as OurPeopleType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import fitty from "fitty";
import { gsap } from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import Wrapper from "@components/Wrapper";
import useMediaQuery from "@hooks/useMediaQuery";

import css from "./index.module.css";

const PeopleCard = ({
	name,
	role,
	avatar,
	avatarFunny,
	avatarBgColor,
	isMouseEntered,
}: NonNullable<OurPeopleType["people"]>[0] & { isMouseEntered: boolean }) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const animationRef = useRef<gsap.core.Timeline | null>(null);
	const offsetYRef = useRef(0);
	const lastScrollYRef = useRef(0);
	const [isHovered, setIsHovered] = useState(false);
	const isTouchDevice = useMediaQuery("(hover: none)");

	useGSAP(
		() => {
			if (!imageRef.current || isTouchDevice) return;

			gsap.set(imageRef.current, {
				xPercent: -50,
				yPercent: -50,
				opacity: 0,
			});

			animationRef.current = gsap
				.timeline({
					paused: true,
				})
				.to(imageRef.current, {
					opacity: 1,
					duration: 0.3,
					ease: "power2.out",
				})
				.set(imageRef.current, {
					delay: 0.1,
				});

			// Pre-render the animation for performance
			animationRef.current.progress(1, true).progress(0, true);
		},
		{
			dependencies: [isTouchDevice],
			revertOnUpdate: true,
		},
	);

	const offsetTop = useCallback(() => {
		if (!cardRef.current) return 0;

		const cardRect = cardRef.current.getBoundingClientRect();
		return cardRect.top;
	}, [isTouchDevice]);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!imageRef.current) return;

			const offsetFromTop = offsetTop();
			offsetYRef.current = e.clientY - offsetFromTop;

			lastScrollYRef.current = window.scrollY;

			const tween = gsap.to(imageRef.current, {
				x: e.clientX,
				y: offsetYRef.current,
				duration: 0.5,
				ease: "power2.out",
			});

			return () => {
				tween.revert().kill();
			};
		},
		[isTouchDevice],
	);

	const handleScroll = useCallback(() => {
		if (!imageRef.current) return;

		const offsetY = lastScrollYRef.current - window.scrollY;

		const tween = gsap.to(imageRef.current, {
			y: () => offsetYRef.current - offsetY,
			duration: 0.8,
			ease: "power2.out",
		});

		return () => {
			tween.revert().kill();
		};
	}, [isTouchDevice]);

	useEffect(() => {
		if (!isMouseEntered || isTouchDevice) return;

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isMouseEntered, isTouchDevice]);

	useGSAP(() => {
		if (!imageRef.current || isTouchDevice) return;

		isHovered ? animationRef.current?.play() : animationRef.current?.reverse();
	}, [isHovered, isTouchDevice]);

	if (!name) return null;

	const hasAvatar = avatar && typeof avatar === "object" && avatar.url;
	const hasAvatarFunny =
		avatarFunny && typeof avatarFunny === "object" && avatarFunny.url;
	return (
		<div
			className={css.person}
			ref={cardRef}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ "--avatar-bg-color": avatarBgColor } as React.CSSProperties}
		>
			{(hasAvatar || hasAvatarFunny) && (
				<div
					ref={imageRef}
					className={css.avatar}
				>
					{hasAvatar && (
						<Image
							src={avatar.url || ""}
							alt={name}
							width={400}
							height={400}
						/>
					)}
					{hasAvatarFunny && (
						<Image
							src={avatarFunny.url || ""}
							alt={name}
							width={400}
							height={400}
						/>
					)}
				</div>
			)}
			<Wrapper className={css.personContent}>
				<div className={css.name}>{name}</div>
				{role && <div className={css.role}>{role}</div>}
			</Wrapper>
			<div className={css.marquee}>
				{Array.from({ length: 10 }).map((_, idx) => (
					<div
						key={idx}
						style={{ "--length": name.length } as React.CSSProperties}
					>
						{name}
					</div>
				))}
			</div>
		</div>
	);
};

const OurPeople: React.FC<OurPeopleType> = ({ title, copy, people }) => {
	const titleRef = useRef<HTMLSpanElement>(null);
	const fitInstanceRef = useRef<any>(null);
	const blockRef = useRef<HTMLDivElement>(null);
	const [isMouseEntered, setIsMouseEntered] = useState(false);

	useEffect(() => {
		if (titleRef.current) {
			fitInstanceRef.current = fitty(titleRef.current, {
				minSize: 12,
				maxSize: 160,
			});

			return () => {
				if (fitInstanceRef.current) {
					fitInstanceRef.current.unsubscribe();
				}
			};
		}
	}, []);

	return (
		<section
			ref={blockRef}
			className={css.block}
			onMouseEnter={() => setIsMouseEntered(true)}
			onMouseLeave={() => setIsMouseEntered(false)}
		>
			<Wrapper className={css.headerBlock}>
				{title && (
					<h2 className={css.title}>
						<span ref={titleRef}>{title}</span>
					</h2>
				)}
				{copy && <div className={css.copy}>{copy}</div>}
			</Wrapper>
			<div className={css.peopleBlock}>
				{people &&
					people.length > 0 &&
					people.map((person, idx) => (
						<PeopleCard
							key={idx}
							{...person}
							isMouseEntered={isMouseEntered}
						/>
					))}
			</div>
		</section>
	);
};

export default OurPeople;
