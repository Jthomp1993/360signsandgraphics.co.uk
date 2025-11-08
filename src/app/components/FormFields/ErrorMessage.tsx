import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import css from "./index.module.css";

type ErrorMessage = {
	message: string;
	show: boolean;
};

export default function ErrorMessage({ message, show = false }: ErrorMessage) {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<CSSTransition
			nodeRef={ref}
			in={show}
			unmountOnExit
			timeout={400}
			classNames={{
				enter: css.enter,
				enterDone: css.enter,
			}}
		>
			<div
				ref={ref}
				className={`${css.errorMessage}`}
			>
				{message}
			</div>
		</CSSTransition>
	);
}
