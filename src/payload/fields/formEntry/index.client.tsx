"use client";

import type { ComponentType } from "react";

import { useAllFormFields } from "@payloadcms/ui";

const URLField: ComponentType = () => {
	const [fields] = useAllFormFields();

	return (
		<div className="field-type text">
			<h3>Entry</h3>
			<div dangerouslySetInnerHTML={{ __html: fields.entry.value || "" }}></div>
		</div>
	);
};

export default URLField;
