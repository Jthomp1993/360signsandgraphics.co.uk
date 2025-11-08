import type { CollectionSlug, DataFromCollectionSlug } from "payload";

import getLinkTarget from "./getLinkTarget";
import getLinkUrl from "./getLinkUrl";

export type getLinkProps = {
	type?: ("reference" | "custom") | null;
	newTab?: boolean | null;
	reference?: {
		value: string | DataFromCollectionSlug<CollectionSlug>;
	} | null;
	url?: string | null;
	label?: string | null;
};

const getLinkProps = (props: getLinkProps) => {
	return { href: getLinkUrl(props), target: getLinkTarget(props) };
};

export default getLinkProps;
