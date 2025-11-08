import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import css from "./index.module.css";

type TextAreaInput = {
	label?: string;
	name: string;
	className?: string;
	value?: string;
	errorMsg?: string;
	required?: boolean;
};

export default function TextAreaInput({
	label,
	name,
	className = "",
	value = "",
	errorMsg = "Please fill required field",
	required = false,
}: TextAreaInput) {
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
			className={`${css.textAreaInput} ${className} ${
				hasError ? css.error : ""
			}`}
		>
			<textarea
				placeholder={label}
				defaultValue={value}
				{...params}
			></textarea>
			<ErrorMessage
				message={errorMsg}
				show={hasError}
			/>
		</div>
	);
}
