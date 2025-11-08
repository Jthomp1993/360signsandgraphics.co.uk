import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";

export const fields: Field[] = [
	blockName(),
	{
		type: "row",
		fields: [
			{
				name: "titleLine1",
				type: "text",
				required: true,
			},
			{
				name: "imageLine1",
				type: "upload",
				relationTo: "media",
				required: true,
			},
		],
	},
	{
		type: "row",
		fields: [
			{
				name: "image1Line2",
				type: "upload",
				relationTo: "media",
				required: true,
			},
			{
				name: "image2Line2",
				type: "upload",
				relationTo: "media",
				required: true,
			},
			{
				name: "titleLine2",
				type: "text",
				required: true,
			},
		],
	},
	{
		name: "video",
		type: "group",
		fields: [
			{
				name: "vimeoVideoId",
				type: "text",
			},
			{
				name: "marqueeText",
				type: "text",
			},
		],
	},
];

const TitleBlock: Block = {
	slug: "title-block",
	interfaceName: "TitleBlock",
	imageURL: "/payload-imgs/TitleBlock.png",
	fields: fields,
};

export default TitleBlock;
