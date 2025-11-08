"use client";

import type { Page } from "@/payload-types";
import type { ReactNode } from "react";

import { useEffect, useRef } from "react";

import { useScrollSmoother } from "@context/ScrollSmootherProvider";

import css from "./index.module.css";

type Layout = {
	children?: ReactNode;
	accentColor?: string | null;
} & Partial<Pick<Page, "template">>;

export default function Layout({ children, template, accentColor }: Layout) {
	const ref = useRef<HTMLElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const blockCSS = [css.block];
	const smoother = useScrollSmoother();

	useEffect(() => {
		const anchor = window.location.hash;

		anchor ? smoother?.scrollTo(anchor) : smoother?.scrollTo(0);
	}, []);

	return (
		<main
			ref={ref}
			className={blockCSS.join(" ")}
			style={
				{
					"--accent-color": accentColor,
				} as React.CSSProperties
			}
		>
			<div ref={innerRef}>{children}</div>
		</main>
	);
}
