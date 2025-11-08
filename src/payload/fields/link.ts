import type { Condition, Field } from "payload";

import deepMerge from "@payload/util/deepMerge";

type LinkType = (options?: {
	disableLabel?: boolean;
	overrides?: Record<string, unknown>;
	condition?: Condition;
}) => Field;

const link: LinkType = ({
	disableLabel = false,
	overrides = {},
	condition = undefined,
} = {}) => {
	const linkResult: Field = {
		name: "link",
		type: "group",
		admin: {
			hideGutter: true,
			condition: condition,
		},
		fields: [
			{
				type: "row",
				fields: [
					{
						name: "type",
						type: "radio",
						options: [
							{
								label: "Internal link",
								value: "reference",
							},
							{
								label: "External Link",
								value: "custom",
							},
						],
						defaultValue: "reference",
						admin: {
							layout: "horizontal",
							width: "50%",
						},
					},
					{
						name: "newTab",
						label: "In new tab",
						type: "checkbox",
						admin: {
							width: "50%",
							style: {
								alignSelf: "flex-end",
							},
						},
					},
				],
			},
		],
	};

	const linkTypes: Field[] = [
		{
			name: "reference",
			label: "Internal Link",
			type: "relationship",
			relationTo: ["pages"],
			required: false,
			maxDepth: 1,
			admin: {
				condition: (_, siblingData) => siblingData?.type === "reference",
			},
		},
		{
			name: "url",
			label: "External Link",
			type: "text",
			required: false,
			admin: {
				condition: (_, siblingData) => siblingData?.type === "custom",
			},
		},
	];

	if (!disableLabel) {
		linkTypes.map((linkType) => ({
			...linkType,
			admin: {
				...linkType.admin,
				width: "50%",
			},
		}));

		linkResult.fields.push({
			type: "row",
			fields: [
				{
					name: "label",
					type: "text",
					localized: true,
					required: false,
					admin: {
						width: "50%",
					},
					hooks: {
						beforeChange: [
							async ({ value, siblingData, req: { payload } }) => {
								if (value) return value;
								if (siblingData?.reference) {
									const doc = await payload.findByID({
										collection: siblingData.reference.relationTo,
										id: siblingData.reference.value,
									});
									return doc?.name || doc?.title;
								}
								return undefined;
							},
						],
					},
				},
				...linkTypes,
			],
		});
	} else {
		linkResult.fields = [...linkResult.fields, ...linkTypes];
	}

	return deepMerge(linkResult, overrides);
};

export default link;
