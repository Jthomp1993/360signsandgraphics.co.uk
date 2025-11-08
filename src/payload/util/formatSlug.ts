import type { FieldHook } from "payload";

export const format = (val: string): string =>
	String(val)
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");

const formatSlug =
	(fallback: string): FieldHook =>
	({ operation, value, originalDoc, data }) => {
		if (value && typeof value === "string") {
			return format(value);
		}

		if (!value) {
			const fallbackData = data?.[fallback] || originalDoc?.[fallback];

			if (fallbackData && typeof fallbackData === "string") {
				return format(fallbackData);
			}
		}

		return value;
	};

export default formatSlug;
