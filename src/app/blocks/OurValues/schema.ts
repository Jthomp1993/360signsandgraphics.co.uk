import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";

const fields: Field[] = [
	blockName(),
	{
		name: "title",
		type: "text",
		required: true,
	},
	{
		name: "items",
		type: "array",
		fields: [
			{
				name: "label",
				type: "textarea",
				required: true,
			},
			{
				name: "copy",
				type: "textarea",
				required: true,
			},
		],
		admin: { components: { RowLabel: "@payload/components/RowLabel" } },
	},
];

const OurValues: Block = {
	slug: "our-values",
	interfaceName: "OurValues",
	imageURL: "/payload-imgs/OurValues.png",
	fields: fields,
};

export default OurValues;
