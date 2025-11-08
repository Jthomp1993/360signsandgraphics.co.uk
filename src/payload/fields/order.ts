import type { Field } from "payload";

import deepMerge from "@payload/util/deepMerge";

export const orderField = (overrides = {}) =>
	deepMerge<Field, Partial<Field>>(
		{
			name: "order",
			label: "Order",
			type: "number",
			index: true,
			defaultValue: 0,
			admin: {
				position: "sidebar",
			},
		},
		overrides,
	);
