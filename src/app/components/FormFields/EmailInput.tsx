import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import css from "./index.module.css";

type EmailInput = {
	label?: string;
	name: string;
	className?: string;
	value?: string;
	required?: boolean;
	errorMsg?: string;
	optIn?: boolean;
};

export default function EmailInput({
	label,
	name,
	className = "",
	value = "",
	errorMsg = "Please fill required field",
	required = false,
	optIn = false,
}: EmailInput) {
	const { register, formState } = useFormContext();
	const [hasError, setError] = useState(false);

	const params = register(name, {
		required,
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: "invalid email address",
		},
	});

	useEffect(() => {
		setError(!!formState.errors[name]);
	}, [formState]);

	return (
		<div
			className={`${css.emailInput} ${className} ${hasError ? css.error : ""}`}
		>
			<input
				type="email"
				placeholder={label}
				defaultValue={value}
				{...params}
			/>
			{optIn && (
				<label>
					<input
						type="checkbox"
						name="opt-in"
					/>
					<i></i>
					<span>Opt in for monthly updates</span>
				</label>
			)}
			<ErrorMessage
				message={errorMsg}
				show={hasError}
			/>
		</div>
	);
}
