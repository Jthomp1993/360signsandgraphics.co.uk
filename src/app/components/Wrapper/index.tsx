"use client";

import { RefObject, useMemo } from "react";

import css from "./index.module.css";

type WrapperProps = {
	ref?: RefObject<HTMLDivElement | null>;
	className?: string;
	children?: React.ReactNode;
};

function Wrapper({ ref = undefined, className = "", children }: WrapperProps) {
	const blockCSS = useMemo(() => {
		const classes = [css.wrapper];
		if (className) {
			classes.push(className);
		}
		return classes.join(" ");
	}, [className]);

	return (
		<div
			ref={ref}
			className={blockCSS}
		>
			{children}
		</div>
	);
}

export default Wrapper;
