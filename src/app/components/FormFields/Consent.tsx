import type { ReactElement } from "react";

import { useEffect, useId, useState } from "react";
import { useFormContext } from "react-hook-form";

import css from "./index.module.css";

type Consent = {
	name?: string;
	label: string | ReactElement;
	className?: string;
	required?: boolean;
	_errorMsg?: string;
};

export default function Consent({
	name = "consent",
	label,
	className = "",
	required = false,
	_errorMsg = "Please fill required field",
}: Consent) {
	const id = useId();

	const { register, formState } = useFormContext();
	const [hasError, setError] = useState(false);

	const params = register(name, {
		required,
	});

	useEffect(() => {
		setError(!!formState.errors[name]);
	}, [formState]);

	return (
		<div className={`${css.consent} ${className} ${hasError ? css.error : ""}`}>
			<label>
				<input
					id={id}
					type="checkbox"
					{...params}
				/>
				<i></i>
				<span
					className="g-text-sm"
					dangerouslySetInnerHTML={{ __html: label || "" }}
				/>
			</label>
		</div>
	);
}
