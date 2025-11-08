"use client";

import type { PayloadClientReactComponent, RowLabelComponent } from "payload";

import { useRowLabel } from "@payloadcms/ui";

const SocialLinkLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
	const { data } = useRowLabel() as any;

	return data?.socialNetwork || null;
};

export default SocialLinkLabel;
