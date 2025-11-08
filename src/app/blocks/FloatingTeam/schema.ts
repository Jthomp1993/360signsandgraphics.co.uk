import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";

const fields: Field[] = [
	blockName(),
	{
		name: "subTitle",
		type: "text",
		required: true,
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
				name: "image",
				type: "upload",
				relationTo: "media",
				required: true,
			},
			{
				name: "bgColor",
				type: "text",
			},
			{
				name: "name",
				type: "text",
				required: true,
			},
			{
				name: "post",
				type: "text",
			},
		],
		admin: {
			components: {
				RowLabel: "@payload/components/RowNameLabel",
			},
		},
	},
];

const FloatingTeam: Block = {
	slug: "floating-team",
	interfaceName: "FloatingTeam",
	imageURL: "/payload-imgs/FloatingTeam.png",
	fields: fields,
};

export default FloatingTeam;
