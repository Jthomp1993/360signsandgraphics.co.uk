"use client";

import type { PayloadClientReactComponent, RowLabelComponent } from "payload";

import { useRowLabel } from "@payloadcms/ui";

const RowTitleLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
	const { data } = useRowLabel() as any;

	return data?.title || null;
};

export default RowTitleLabel;
