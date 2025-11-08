import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import css from "./index.module.css";

type PhoneInput = {
	label?: string;
	name: string;
	className?: string;
	value?: string;
	errorMsg?: string;
	required?: boolean;
};

export default function PhoneInput({
	label,
	name,
	className = "",
	value = "",
	errorMsg = "Please fill required field",
	required = false,
}: PhoneInput) {
	const { register, formState } = useFormContext();
	const [hasError, setError] = useState(false);

	const params = register(name, {
		required,
	});

	useEffect(() => {
		setError(!!formState.errors[name]);
	}, [formState]);

	return (
		<div
			className={`${css.phoneInput} ${className} ${hasError ? css.error : ""}`}
		>
			<input
				type="tel"
				placeholder={label}
				defaultValue={value}
				inputMode="numeric"
				{...params}
			/>
			<ErrorMessage
				message={errorMsg}
				show={hasError}
			/>
		</div>
	);
}
