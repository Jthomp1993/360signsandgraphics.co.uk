import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import { lexicalMedium } from "@payload/fields/lexical";
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
				name: "image",
				type: "upload",
				label: "Image",
				relationTo: "media",
				required: true,
			},
			{
				name: "title",
				type: "text",
				label: "Title",
				required: true,
			},
			{
				name: "role",
				type: "text",
				label: "Role",
			},
			...lexicalMedium("quote"),
		],
		admin: {
			components: {
				RowLabel: "@payload/components/RowTitleLabel",
			},
		},
	},
];

const Reviews: Block = {
	slug: "reviews",
	interfaceName: "Reviews",
	imageURL: "/payload-imgs/Reviews.png",
	fields: fields,
};

export default Reviews;
