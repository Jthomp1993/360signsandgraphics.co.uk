import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import css from "./index.module.css";

type ButtonGroup = {
	items: string[];
	name: string;
	type?: "radio" | "checkbox";
	className?: string;
	value?: string;
	required?: boolean;
	errorMsg?: string;
	style?: "default" | "alt";
};

export default function ButtonGroup({
	items,
	type = "radio",
	name,
	className = "",
	value = "",
	errorMsg = "Please fill required field",
	style,
	required = false,
}: ButtonGroup) {
	const blockCSS = [css.buttonGroup];
	const { register, formState } = useFormContext();
	const [hasError, setError] = useState(false);

	if (className) {
		blockCSS.push(className);
	}

	if (style && style != "default") {
		blockCSS.push(css[style]);
	}

	useEffect(() => {
		setError(!!formState.errors[name]);
	}, [formState]);

	return (
		<div className={`${blockCSS.join(" ")} ${hasError ? css.error : ""}`}>
			{items &&
				items.map((val, idx) => {
					const params = register(`${name}${type == "checkbox" ? "[]" : ""}`, {
						required,
					});

					return (
						<label key={idx}>
							<input
								type={type}
								defaultValue={val}
								defaultChecked={value == val}
								{...params}
							/>
							<span>{val}</span>
						</label>
					);
				})}
			<ErrorMessage
				message={errorMsg}
				show={hasError}
			/>
		</div>
	);
}
