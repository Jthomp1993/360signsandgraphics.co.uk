import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import css from "./index.module.css";

type UploadInput = {
	label: string;
	name: string;
	className?: string;
	//value?: string,
	errorMsg?: string;
	required?: boolean;
	accept?: string;
};

export default function UploadInput({
	label,
	name,
	className = "",
	errorMsg = "Please fill required field",
	required = false,
	accept = undefined,
}: UploadInput) {
	const [value, setValue] = useState(label);
	const { register, formState } = useFormContext();
	const [hasError, setError] = useState(false);

	const onChange = (e: any) => {
		const files = e.target.files;

		setValue(files.length ? files[0].name : label);
	};

	const params = register(name, {
		required,
		onChange: onChange,
	});

	useEffect(() => {
		setError(!!formState.errors[name]);
	}, [formState]);

	return (
		<div
			className={`${css.uploadInput} ${className} ${hasError ? css.error : ""}`}
		>
			<label>
				<input
					type="file"
					placeholder={label}
					data-selected={label != value}
					accept={accept}
					{...params}
				/>
				<span>
					{value}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 32 32"
					>
						<circle
							cx="15.949"
							cy="16.213"
							r="15.75"
							fill="#D9D9D9"
						></circle>
						<path
							fill="#D9D9D9"
							fillRule="evenodd"
							d="M15.947 8.83c.164 0 .328.062.452.187l2.873 2.872a.638.638 0 11-.903.903l-1.784-1.784v6.758a.638.638 0 01-1.277 0v-6.755l-1.78 1.781a.638.638 0 01-.904-.903l2.848-2.847a.636.636 0 01.475-.212zm5.747 5.745c.352 0 .638.285.638.638v5.744a.638.638 0 01-.638.639h-11.49a.638.638 0 01-.638-.639v-5.742a.638.638 0 011.277 0v5.104h10.212v-5.106c0-.353.286-.638.639-.638z"
							clipRule="evenodd"
						></path>
					</svg>
				</span>
			</label>
			<ErrorMessage
				message={errorMsg}
				show={hasError}
			/>
		</div>
	);
}
