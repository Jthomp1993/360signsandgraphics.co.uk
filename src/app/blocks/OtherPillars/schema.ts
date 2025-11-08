import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import link from "@payload/fields/link";

const fields: Field[] = [
	blockName(),
	{
		name: "title",
		type: "textarea",
		label: "Title",
		required: true,
	},
	{
		name: "prev",
		type: "group",
		fields: [
			{
				name: "bgColor",
				type: "text",
				label: "Background Color",
				admin: {
					description: "Enter a hex color code (e.g. #FFFFFF)",
				},
			},
			link(),
		],
	},
	{
		name: "next",
		type: "group",
		fields: [
			{
				name: "bgColor",
				type: "text",
				label: "Background Color",
				admin: {
					description: "Enter a hex color code (e.g. #FFFFFF)",
				},
			},
			link(),
		],
	},
];

const OtherPillars: Block = {
	slug: "other-pillars",
	interfaceName: "OtherPillars",
	imageURL: "/payload-imgs/OtherPillars.png",
	fields: fields,
};

export default OtherPillars;
