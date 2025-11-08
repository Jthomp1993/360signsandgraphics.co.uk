"use client";

import { FieldLabel, useField } from "@payloadcms/ui";

export const URLField = ({ path, label }: { path: string; label?: string }) => {
	const { value } = useField<string>({ path });
	return (
		<div className="field-type text">
			<FieldLabel label={label} />
			<a
				href={value}
				target="_blank"
				rel="noreferrer"
			>
				{value}
			</a>
		</div>
	);
};

export default URLField;
