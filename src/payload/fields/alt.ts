import type { Field, FieldHook } from "payload";

const parseFilename = (filename: string): string => {
	// Remove file extension
	const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
	// Replace hyphens and underscores with spaces
	const formattedName = nameWithoutExt.replace(/[-_]/g, " ");
	// Capitalize first letter of each word
	return formattedName
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
};

const formatAlt =
	(): FieldHook =>
	({ operation, value, originalDoc, data }) => {
		if (value && typeof value === "string") {
			return value;
		}

		if (!value) {
			const fallbackData = data?.filename || originalDoc?.filename;

			if (fallbackData && typeof fallbackData === "string") {
				return parseFilename(fallbackData);
			}
		}

		return value;
	};

export const altField = (): Field => ({
	name: "alt",
	label: "Alt",
	type: "text",
	hooks: {
		beforeValidate: [formatAlt()],
	},
});
