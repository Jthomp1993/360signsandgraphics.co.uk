import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import css from "./index.module.css";

type TextInput = {
	label?: string;
	name: string;
	className?: string;
	value?: string;
	errorMsg?: string;
	required?: boolean;
};

export default function TextInput({
	label,
	name,
	className = "",
	value = "",
	errorMsg = "Please fill required field",
	required = false,
}: TextInput) {
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
			className={`${css.textInput} ${className} ${hasError ? css.error : ""}`}
		>
			<input
				type="text"
				placeholder={label}
				defaultValue={value}
				{...params}
			/>
			<ErrorMessage
				message={errorMsg}
				show={hasError}
			/>
		</div>
	);
}
