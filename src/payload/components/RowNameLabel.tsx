"use client";

import type { PayloadClientReactComponent, RowLabelComponent } from "payload";

import { useRowLabel } from "@payloadcms/ui";

const RowNameLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
	const { data } = useRowLabel() as any;

	return data?.name || null;
};

export default RowNameLabel;
