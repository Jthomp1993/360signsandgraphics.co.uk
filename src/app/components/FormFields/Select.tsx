import type { MouseEvent } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CSSTransition } from "react-transition-group";

import ErrorMessage from "./ErrorMessage";
import css from "./index.module.css";

type Select = {
	label?: string;
	name: string;
	className?: string;
	value?: string;
	errorMsg?: string;
	required?: boolean;
	options: string[];
};

export default function Select({
	label,
	name,
	className = "",
	value = "",
	errorMsg = "Please fill required field",
	options,
	required = false,
}: Select) {
	const ref = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);
	//const [currentValue, setCurrentValue] = useState(value)
	const [showOptions, setShowOptions] = useState(false);
	const { register, formState, setValue, getValues } = useFormContext();
	const [hasError, setError] = useState(false);
	const { contextSafe } = useGSAP();

	const params = register(name, {
		required,
	});

	useEffect(() => {
		setError(!!formState.errors[name]);
	}, [formState]);

	useEffect(() => {
		const onClick = (e: any) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setShowOptions(false);
			}
		};

		document.addEventListener("mousedown", onClick);

		return () => {
			document.removeEventListener("mousedown", onClick);
		};
	}, []);

	const onShowOptions = (e: MouseEvent) => {
		e.preventDefault();

		setShowOptions(!showOptions);
	};

	const onSetOption = (val: string) => {
		setValue(name, val);
		setShowOptions(false);
	};

	const onEnter = useCallback(() => {
		gsap.from(listRef.current, {
			autoAlpha: 0,
		});

		return () => {
			gsap.killTweensOf(listRef.current);
		};
	}, []);

	const onExit = useCallback(() => {
		gsap.to(listRef.current, {
			autoAlpha: 0,
		});

		return () => {
			gsap.killTweensOf(listRef.current);
		};
	}, []);

	return (
		<div
			ref={ref}
			className={`${css.select} ${className}`}
		>
			<input
				type="text"
				defaultValue={value}
				{...params}
			/>
			<button
				className={`${css.selectToggle} ${hasError ? css.error : ""}`}
				onClick={onShowOptions}
			>
				<span>{getValues(name) || label}</span>
				<svg
					width="13"
					height="8"
					viewBox="0 0 13 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.5859 1L6.29348 5.98113L1.00103 1"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg>
			</button>
			<CSSTransition
				nodeRef={listRef}
				timeout={500}
				in={showOptions}
				unmountOnExit
				onEnter={onEnter}
				onExit={onExit}
			>
				<ul
					ref={listRef}
					className={css.selectList}
				>
					{options &&
						options.map((val, idx) => (
							<li
								key={idx}
								data-current={val == getValues(name)}
								onClick={() => {
									onSetOption(val);
								}}
							>
								{val}
							</li>
						))}
				</ul>
			</CSSTransition>
			<ErrorMessage
				message={errorMsg}
				show={hasError}
			/>
		</div>
	);
}
