import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import link from "@payload/fields/link";

const fields: Field[] = [
	blockName(),
	{
		name: "subTitle",
		type: "text",
		label: "Sub Title",
	},
	{
		name: "title",
		type: "text",
		label: "Title",
		required: true,
	},
	{
		name: "items",
		type: "array",
		label: "Items",
		maxRows: 3,
		fields: [
			{
				name: "bgColor",
				type: "select",
				label: "Background Color",
				options: [
					{
						label: "Purple",
						value: "purple"
					},
					{
						label: "Pink",
						value: "pink"
					},
					{
						label: "Teal",
						value: "teal"
					}
				],
				defaultValue: "purple",
			},
			{
				name: "title",
				type: "text",
				label: "Title",
				required: true,
			},
			{
				name: "tags",
				type: "text",
				label: "Tags",
				hasMany: true,
			},
			{
				name: "image",
				type: "upload",
				label: "Image",
				relationTo: "media",
				required: true,
			},
			link({
				disableLabel: true,
			}),
		],
		admin: {
			components: {
				RowLabel: "@payload/components/RowTitleLabel",
			},
		},
	},
];

const Stories: Block = {
	slug: "stories",
	labels: {
		singular: "Stories",
		plural: "Stories",
	},
	interfaceName: "Stories",
	imageURL: "/payload-imgs/Stories.png",
	fields: fields,
};

export default Stories;
