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
		name: "copy",
		type: "text",
	},
	{
		name: "people",
		type: "array",
		fields: [
			{
				name: "name",
				type: "text",
				required: true,
			},
			{
				name: "role",
				type: "text",
			},
			{
				name: "avatarBgColor",
				type: "text",
				label: "Avatar Background Color",
				admin: {
					description: "Enter a hex color code (e.g. #FFFFFF)",
				},
			},
			{
				name: "avatar",
				type: "upload",
				relationTo: "media",
			},
			{
				name: "avatarFunny",
				type: "upload",
				relationTo: "media",
			},
		],
		admin: {
			initCollapsed: true,
			components: {
				RowLabel: "@payload/components/RowNameLabel",
			},
		},
	},
];

const OurPeople: Block = {
	slug: "our-people",
	labels: {
		singular: "Our People",
		plural: "Our People",
	},
	interfaceName: "OurPeople",
	imageURL: '/payload-imgs/OurPeople.png',
	fields: fields,
};

export default OurPeople;
