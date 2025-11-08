import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";

const fields: Field[] = [
	blockName(),
	{
		name: "subTitle",
		type: "text",
	},
	{
		name: "title",
		type: "textarea",
		required: true,
	},
	{
		name: "items",
		type: "array",
		maxRows: 3,
		fields: [
			{
				name: "number",
				type: "number",
				required: true,
			},
			{
				name: "title",
				type: "text",
				required: true,
			},
		],
		admin: {
			components: {
				RowLabel: "@payload/components/RowTitleLabel",
			},
		},
	},
];

const FloatingNumbers: Block = {
	slug: "floating-numbers",
	interfaceName: "FloatingNumbers",
	imageURL: "/payload-imgs/FloatingNumbers.png",
	fields: fields,
};

export default FloatingNumbers;
