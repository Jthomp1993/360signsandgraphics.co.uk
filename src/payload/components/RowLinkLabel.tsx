"use client";

import type { PayloadClientReactComponent, RowLabelComponent } from "payload";

import { useRowLabel } from "@payloadcms/ui";

const RowLinkLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
	const { data } = useRowLabel() as any;

	return data?.link?.label || null;
};

export default RowLinkLabel;
