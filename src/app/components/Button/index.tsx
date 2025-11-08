"use client";

import type { CollectionSlug, DataFromCollectionSlug } from "payload";
import type { Ref } from "react";

import Link from "next/link";
import { forwardRef, memo, useCallback, useMemo } from "react";

import getLinkTarget from "@util/getLinkTarget";
import getLinkUrl from "@util/getLinkUrl";
import scrollTo from "@util/scrollTo";

import css from "./index.module.css";

type Button = {
	id?: string;
	buttonType?: "link" | "submit";
	type?: ("reference" | "custom") | null;
	newTab?: boolean | null;
	reference?: {
		value: string | DataFromCollectionSlug<CollectionSlug>;
	} | null;
	url?: string | null;
	label?: string | null;
	style?:
		| "primaryMdBlue"
		| "primaryDarkBlue"
		| "secondaryLight"
		| "secondaryDark";
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export const ButtonIcon = memo(() => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.2939 1H0.353518V0H11.5012H12.0012V0.5V11.6455H11.0012V1.70694L0.707036 11.9991L0 11.2919L10.2939 1Z"
			fill="currentColor"
		/>
	</svg>
));
ButtonIcon.displayName = "ButtonIcon";

const Content = memo(({ label }: { label: string }) => (
	<>
		<span data-text={label}>
			<span>{label}</span>
		</span>
		<i>
			<ButtonIcon />
			<ButtonIcon />
		</i>
	</>
));
Content.displayName = "ButtonContent";

const Button = (
	props: Button,
	ref: Ref<HTMLButtonElement & HTMLAnchorElement>,
) => {
	const {
		id,
		label,
		className,
		style = "primaryMdBlue",
		onClick,
		buttonType = "link",
	} = props;

	const blockCSS = useMemo(() => {
		const classes = [css.button];
		if (style) {
			classes.push(css[style]);
		}
		if (className) {
			classes.push(className);
		}
		return classes.join(" ");
	}, [style, className]);

	const href = getLinkUrl(props);
	const isAnchor = href.indexOf("#") !== -1;
	const target = getLinkTarget(props);

	if (!label) return null;

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
			onClick && onClick(e);

			if (isAnchor) {
				scrollTo(href);
			}
		},
		[onClick, isAnchor, href],
	);

	return (
		<>
			{buttonType === "link" ? (
				<Link
					ref={ref}
					id={id}
					className={blockCSS}
					href={href}
					scroll={false}
					target={target}
					onClick={handleClick}
				>
					<Content label={label} />
				</Link>
			) : (
				<button
					ref={ref}
					className={blockCSS}
					onClick={handleClick}
				>
					<Content label={label} />
				</button>
			)}
		</>
	);
};

const ButtonRef = memo(forwardRef(Button));
ButtonRef.displayName = "Button";

export default ButtonRef;
