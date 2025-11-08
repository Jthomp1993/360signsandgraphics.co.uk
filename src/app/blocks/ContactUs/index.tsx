"use client";

import type { ContactUsTemplate as ContactUsType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import fitty from "fitty";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import Flip from "gsap/dist/Flip";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

import Wrapper from "@components/Wrapper";
import { useGlobalContext } from "@context/GlobalProvider";

import css from "./index.module.css";

const Heart: React.FC<{ isActive?: boolean; onClick?: () => void }> = ({
	isActive = false,
	onClick,
}) => {
	return (
		<div
			className={css.heart}
			data-active={isActive || undefined}
			onClick={onClick || undefined}
		>
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					className={css.heartFill}
					d="M7.54604 7.6898L5.48438 13.8748L7.54604 19.5444L19.916 32.9452L29.1935 23.6677L33.8322 17.9981V11.8131V7.6898L29.1935 6.14355L24.0393 7.6898L19.916 10.2669L16.3081 6.14355H12.7002L7.54604 7.6898Z"
					fill="transparent"
				/>
				<path
					className={css.heartStroke}
					d="M20.0026 34.9993L17.5859 32.8327C14.7804 30.3049 12.4609 28.1243 10.6276 26.291C8.79427 24.4577 7.33594 22.8118 6.2526 21.3535C5.16927 19.8952 4.41233 18.5549 3.98177 17.3327C3.55122 16.1105 3.33594 14.8605 3.33594 13.5827C3.33594 10.9716 4.21094 8.79102 5.96094 7.04102C7.71094 5.29102 9.89149 4.41602 12.5026 4.41602C13.947 4.41602 15.322 4.72157 16.6276 5.33268C17.9332 5.94379 19.0582 6.8049 20.0026 7.91602C20.947 6.8049 22.072 5.94379 23.3776 5.33268C24.6832 4.72157 26.0582 4.41602 27.5026 4.41602C30.1137 4.41602 32.2943 5.29102 34.0443 7.04102C35.7943 8.79102 36.6693 10.9716 36.6693 13.5827C36.6693 14.8605 36.454 16.1105 36.0234 17.3327C35.5929 18.5549 34.8359 19.8952 33.7526 21.3535C32.6693 22.8118 31.2109 24.4577 29.3776 26.291C27.5443 28.1243 25.2248 30.3049 22.4193 32.8327L20.0026 34.9993ZM20.0026 30.4993C22.6693 28.1105 24.8637 26.0618 26.5859 24.3535C28.3082 22.6452 29.6693 21.1591 30.6693 19.8952C31.6693 18.6313 32.3637 17.5063 32.7526 16.5202C33.1415 15.5341 33.3359 14.5549 33.3359 13.5827C33.3359 11.916 32.7804 10.5271 31.6693 9.41602C30.5582 8.3049 29.1693 7.74935 27.5026 7.74935C26.197 7.74935 24.9887 8.1174 23.8776 8.85352C22.7665 9.58963 22.0026 10.5271 21.5859 11.666L18.4193 11.666C18.0026 10.5271 17.2387 9.58963 16.1276 8.85352C15.0165 8.1174 13.8082 7.74935 12.5026 7.74935C10.8359 7.74935 9.44705 8.3049 8.33594 9.41602C7.22483 10.5271 6.66927 11.916 6.66927 13.5827C6.66927 14.5549 6.86372 15.5341 7.2526 16.5202C7.64149 17.5063 8.33594 18.6313 9.33594 19.8952C10.3359 21.1591 11.697 22.6452 13.4193 24.3535C15.1415 26.0618 17.3359 28.1105 20.0026 30.4993Z"
					fill="currentColor"
				/>
			</svg>
		</div>
	);
};

const PersonDetails: React.FC<{
	person?: NonNullable<ContactUsType["people"]>[0] | null;
	activeIdx: number | null;
}> = ({ person, activeIdx }) => {
	const personDetailsRef = useRef<HTMLDivElement>(null);
	const activePersonRef = useRef<HTMLDivElement>(null);
	const flipStateRef = useRef<Flip.FlipState | null>(null);

	// Fit card while resizing
	useGSAP(
		(_, contextSafe) => {
			if (!personDetailsRef.current || activeIdx === null) return;

			gsap.registerPlugin(Flip);

			const blockEl = personDetailsRef.current.parentElement;
			if (!blockEl) return;

			const personCardEl = gsap.utils.toArray<HTMLDivElement>(
				`.${css.person}`,
				blockEl,
			)[activeIdx];
			const targetCardEl = gsap.utils.toArray<HTMLDivElement>(
				`.${css.cardCol}`,
				personDetailsRef.current,
			)[0];

			const handleResize =
				contextSafe &&
				contextSafe(() => {
					Flip.fit(personCardEl, targetCardEl);
				});

			handleResize && window.addEventListener("resize", handleResize);

			return () => {
				handleResize && window.removeEventListener("resize", handleResize);
			};
		},
		{ dependencies: [activeIdx, person], revertOnUpdate: true },
	);

	// Animate person details
	const onEnter = useCallback(() => {
		if (!personDetailsRef.current || activeIdx === null) return;

		const blockEl = personDetailsRef.current.parentElement;
		if (!blockEl) return;

		const ctx = gsap.context(() => {
			gsap.registerPlugin(Flip);

			const flipConfig = {
				duration: 1.3,
				ease: "power2.inOut",
			};

			const personCardEls = gsap.utils.toArray<HTMLDivElement>(
				`.${css.person}`,
			);
			const personCardEl = personCardEls[activeIdx];
			activePersonRef.current = personCardEl;

			const personCardInnerEl = gsap.utils.toArray<HTMLDivElement>(
				`.${css.personInner}`,
				personCardEl,
			)[0];
			const targetCardEl = gsap.utils.toArray<HTMLDivElement>(
				`.${css.cardCol}`,
				personDetailsRef.current,
			)[0];

			flipStateRef.current = Flip.getState(personCardEl);
			const flipAnim = Flip.fit(personCardEl, targetCardEl, flipConfig);

			const tl = gsap.timeline({
				defaults: {
					duration: 1,
					ease: "power2.out",
				},
			});

			tl.from(`.${css.personDetails}`, {
				opacity: 0,
			});

			tl.to(
				personCardEls,
				{
					opacity: (idx) => (idx === activeIdx ? 1 : 0),
				},
				"<",
			);

			tl.set(
				personCardEl,
				{
					zIndex: 10,
				},
				"<",
			);

			flipAnim && tl.add(flipAnim as any, "<");

			tl.to(
				personCardInnerEl,
				{
					rotateY: 180,
					...flipConfig,
				},
				"<",
			);

			tl.to(
				`.${css.personDetailsTitle}`,
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					duration: 1.5,
					ease: "power2.out",
				},
				"<80%",
			);

			tl.from(
				`.${css.personDetails} .${css.copy}`,
				{
					opacity: 0,
				},
				"<20%",
			);

			tl.from(
				`.${css.personDetails} .${css.contact}`,
				{
					opacity: 0,
					stagger: 0.1,
				},
				"<20%",
			);
		}, blockEl || undefined);

		return () => {
			ctx.revert();
		};
	}, [activeIdx, person]);

	// Animate person details on exit
	const onExit = useCallback(() => {
		if (!activePersonRef.current) return;

		const blockEl = personDetailsRef.current?.parentElement;

		const ctx = gsap.context(() => {
			gsap.registerPlugin(Flip);
			const personCardInnerEl = gsap.utils.toArray<HTMLDivElement>(
				`.${css.personInner}`,
				activePersonRef.current,
			)[0];
			const personCardEls = gsap.utils.toArray<HTMLDivElement>(
				`.${css.person}`,
			);

			flipStateRef.current &&
				Flip.to(flipStateRef.current, {
					duration: 1,
					ease: "power2.out",
					onComplete: () => {
						Flip.killFlipsOf(activePersonRef.current);
					},
				});

			gsap.to(personCardInnerEl, {
				rotateY: 0,
				duration: 1,
				ease: "power2.out",
			});

			gsap.to(personDetailsRef.current, {
				opacity: 0,
				duration: 1,
				ease: "power2.out",
			});

			gsap.to(personCardEls, {
				opacity: 1,
				duration: 1,
				ease: "power2.out",
				clearProps: "all",
			});
		}, blockEl || undefined);

		return () => {
			ctx.revert();
		};
	}, [activeIdx, person]);

	return (
		<Transition
			in={activeIdx !== null}
			nodeRef={personDetailsRef}
			timeout={800}
			onEnter={onEnter}
			onExit={onExit}
			mountOnEnter
			unmountOnExit
		>
			<div
				ref={personDetailsRef}
				className={css.personDetails}
			>
				<Wrapper className={css.wrapper}>
					<div className={css.cardCol}></div>
					<div className={css.contentCol}>
						<h3
							className={css.personDetailsTitle}
						>{`IT’S ${person?.name}`}</h3>
						{person?.copyHTML && (
							<div className={css.copy}>{parse(person.copyHTML)}</div>
						)}
						{person?.contacts && person.contacts.length > 0 && (
							<div className={css.personDetailsContacts}>
								{person.contacts.map(({ label, link, value }, idx) => (
									<div
										key={idx}
										className={css.contact}
									>
										<div className={css.contactLabel}>{label}</div>
										<div className={css.contactValue}>
											{link && (
												<Link
													href={link}
													target="_blank"
												/>
											)}
											<span data-label={value}>
												<span>{value}</span>
											</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</Wrapper>
			</div>
		</Transition>
	);
};

const Person: React.FC<
	NonNullable<ContactUsType["people"]>[0] & {
		idx: number;
		activePersonIdx: number | null;
		setActivePersonIdx: (idx: number) => void;
		setActivePerson: (person: NonNullable<ContactUsType["people"]>[0]) => void;
		parentDragging: Draggable[] | null;
	}
> = (props) => {
	const {
		image,
		activeImage,
		name,
		idx,
		setActivePersonIdx,
		setActivePerson,
		parentDragging,
		activePersonIdx,
	} = props;
	const personRef = useRef<HTMLDivElement>(null);
	const activeImageObj =
		activeImage && typeof activeImage === "object" && activeImage.url
			? activeImage
			: image;

	// Swipe to talk to person
	useGSAP(
		() => {
			if (!personRef.current) return;

			gsap.registerPlugin(Draggable);

			const trackEl = gsap.utils.toArray<HTMLDivElement>(
				`.${css.swipeTrack}`,
			)[0];
			const buttonEl = gsap.utils.toArray<HTMLButtonElement>(
				`.${css.swipeBlock} button`,
			)[0];

			const draggable = Draggable.create(buttonEl, {
				type: "x",
				bounds: trackEl,
				inertia: true,
				snap: [0, 100],
				onDragStart: () => {
					parentDragging?.forEach((p) => p.disable());
				},
				onDragEnd: (p) => {
					parentDragging?.forEach((p) => p.enable());
					const trackRect = trackEl.getBoundingClientRect();
					const progress = (p.x - trackRect.left) / trackEl.offsetWidth;

					// If the progress is greater than 70%, move the button to the end of the track
					if (progress > 0.7) {
						gsap.to(buttonEl, {
							x: () => trackEl.offsetWidth - buttonEl.offsetWidth,
							duration: 0.5,
							ease: "power2.out",
						});

						draggable[0].disable();

						setActivePersonIdx(idx);
						setActivePerson(props);
					} else {
						gsap.to(buttonEl, {
							x: 0,
							duration: 0.5,
							ease: "power2.out",
						});
					}
				},
			});

			if (activePersonIdx === null) {
				gsap.set(buttonEl, {
					clearProps: "all",
				});
				draggable[0].enable();
				draggable[0].update();
			}
		},
		{
			scope: personRef,
			dependencies: [parentDragging, activePersonIdx],
		},
	);

	// Animate card
	useGSAP(
		() => {
			if (!personRef.current) return;

			gsap.fromTo(
				`.${css.personInner}`,
				{
					rotate: idx === 0 ? 3 : -3,
				},
				{
					rotate: idx === 0 ? -3 : 3,
					delay: idx === 0 ? 0 : 0.2,
					duration: 3.5,
					ease: "power2.inOut",
					repeat: -1,
					yoyo: true,
				},
			);
		},
		{ scope: personRef },
	);

	return (
		<div
			ref={personRef}
			className={css.person}
		>
			<div className={css.personInner}>
				<div className={css.cardFront}>
					<Heart
						onClick={() => {
							setActivePersonIdx(idx);
							setActivePerson(props);
						}}
					/>
					{image && typeof image === "object" && image.url && (
						<Image
							src={image.url}
							alt={name || ""}
							width={350 * 1.5}
							height={520 * 1.5}
						/>
					)}
					<div className={css.swipeBlock}>
						<div className={css.swipeTrack}>
							<button>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="26"
									height="26"
									viewBox="0 0 26 26"
									fill="none"
								>
									<path
										d="M12.5439 1.73828L24.1236 12.3673L13.3136 23.7782"
										stroke="white"
										strokeWidth="2.6136"
									/>
									<path
										d="M1.34961 2.12891L12.9293 12.7579L2.11926 24.1688"
										stroke="white"
										strokeWidth="2.6136"
									/>
								</svg>
							</button>
							<span>{`Swipe to talk to ${name}`}</span>
						</div>
					</div>
				</div>
				<div className={css.cardBack}>
					<Heart isActive={true} />
					{activeImageObj &&
						typeof activeImageObj === "object" &&
						activeImageObj.url && (
							<Image
								src={activeImageObj.url}
								alt={name || ""}
								width={350 * 1.5}
								height={520 * 1.5}
							/>
						)}
				</div>
			</div>
		</div>
	);
};

const ContactUs: React.FC<ContactUsType> = ({
	title,
	copyHTML,
	people,
	contacts,
}) => {
	const titleRef = useRef<HTMLSpanElement>(null);
	const blockRef = useRef<HTMLElement>(null);
	const [activePersonIdx, setActivePersonIdx] = useState<number | null>(null);
	const [activePerson, setActivePerson] = useState<
		NonNullable<ContactUsType["people"]>[0] | null
	>(null);
	const [parentDragging, setParentDragging] = useState<Draggable[] | null>(
		null,
	);
	const { setNavButton, navButton } = useGlobalContext();

	// Fitty for title
	useEffect(() => {
		if (!titleRef.current) return;

		const fittyInstance = fitty(titleRef.current, {
			minSize: 12,
			maxSize: 280,
		});

		return () => {
			fittyInstance.unsubscribe();
		};
	}, []);

	// Horizontal scroll for people on mobile
	useGSAP(
		() => {
			gsap.registerPlugin(Draggable);

			const mm = gsap.matchMedia();

			mm.add("(max-width: 959px)", () => {
				const draggable = Draggable.create(`.${css.peopleInner}`, {
					type: "x",
					bounds: `.${css.people}`,
					inertia: true,
					liveSnap: {
						x: (value) => Math.min(value, 0),
					},
				});

				setParentDragging(draggable);

				return () => {
					setParentDragging(null);
				};
			});
		},
		{ scope: blockRef },
	);

	useEffect(() => {
		if (navButton === false) {
			setActivePersonIdx(null);
		}
	}, [navButton]);

	// Set nav button callback
	useEffect(() => {
		if (activePersonIdx === null) return;

		setNavButton(true);

		return () => {
			setNavButton(null);
		};
	}, [activePersonIdx]);

	return (
		<section
			ref={blockRef}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				<div className={css.contentCol}>
					{title && (
						<h2 className={css.title}>
							<span ref={titleRef}>{title}</span>
						</h2>
					)}
					{copyHTML && <div className={css.copy}>{parse(copyHTML)}</div>}
					{contacts && contacts.length > 0 && (
						<div className={css.contacts}>
							{contacts.map(({ label, link }, idx) => (
								<div
									key={idx}
									className={css.contact}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="15"
										height="19"
										viewBox="0 0 15 19"
										fill="none"
									>
										<path
											d="M1 0L1 12.5205L12.2954 12.5205"
											stroke="currentColor"
											strokeWidth="1.5"
										/>
										<path
											d="M8.0625 7.04492L13.0042 12.5226L8.0625 18.0004"
											stroke="currentColor"
											strokeWidth="1.5"
										/>
									</svg>
									{link && (
										<Link
											href={link}
											target="_blank"
										/>
									)}
									<span data-label={label}>
										<span>{label}</span>
									</span>
								</div>
							))}
						</div>
					)}
				</div>
				{people && (
					<div className={css.people}>
						<div className={css.peopleInner}>
							{people.map((person, idx) => (
								<Person
									key={idx}
									idx={idx}
									activePersonIdx={activePersonIdx}
									setActivePersonIdx={setActivePersonIdx}
									setActivePerson={setActivePerson}
									parentDragging={parentDragging}
									{...person}
								/>
							))}
						</div>
					</div>
				)}
			</Wrapper>
			<PersonDetails
				person={activePerson}
				activeIdx={activePersonIdx}
			/>
		</section>
	);
};

export default ContactUs;
