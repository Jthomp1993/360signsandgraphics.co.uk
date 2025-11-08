import type { CollectionSlug, DataFromCollectionSlug } from "payload";

export type getLinkUrl = {
	type?: ("reference" | "custom") | null;
	newTab?: boolean | null;
	reference?: {
		value: string | DataFromCollectionSlug<CollectionSlug>;
	} | null;
	url?: string | null;
	label?: string | null;
};

const getLinkUrl = ({ type, reference, url }: getLinkUrl): string => {
	if (type == "custom" && url) return url;

	if (
		type == "reference" &&
		reference &&
		typeof reference.value == "object" &&
		"url" in reference.value
	)
		return reference.value.url as string;

	return "";
};

export default getLinkUrl;
