import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";

const fields: Field[] = [
	blockName(),
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
				name: "label",
				type: "text",
				required: true,
			},
			{
				name: "name",
				type: "text",
				required: true,
				admin: {
					description: "Team member's name",
				},
			},
			{
				name: "copy",
				type: "textarea",
				admin: {
					description: "Description or bio of the team member",
				},
			},
			{
				name: "image",
				type: "upload",
				relationTo: "media",
				required: true,
			},
		],
		admin: {
			components: {
				RowLabel: "@payload/components/RowLabel",
			},
		},
	},
];

const FloatingTeam2: Block = {
	slug: "floating-team2",
	interfaceName: "FloatingTeam2",
	imageURL: "/payload-imgs/FloatingTeam2.png",
	fields: fields,
};

export default FloatingTeam2;
