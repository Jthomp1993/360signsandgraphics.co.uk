"use client";

import type { PayloadClientReactComponent, RowLabelComponent } from "payload";

import { useRowLabel } from "@payloadcms/ui";

const RowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
	const { data } = useRowLabel() as any;

	return data?.label || null;
};

export default RowLabel;
