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
		type: "textarea",
		label: "Title",
		required: true,
	},
	{
		name: "image",
		type: "upload",
		label: "Image",
		relationTo: "media",
	},
	{
		name: "enableButtons",
		type: "checkbox",
		label: "Enable Buttons",
		defaultValue: false,
	},
	{
		name: "buttons",
		type: "array",
		label: "Buttons",
		fields: [
			{
				name: "isActive",
				type: "checkbox",
				label: "Active",
			},
			{
				name: "color",
				type: "text",
				label: "Color",
				admin: {
					description: "Enter a hex color code (e.g. #FFFFFF)",
				},
			},
			link(),
		],
		admin: {
			condition: (data, siblingData) => siblingData.enableButtons,
			components: {
				RowLabel: "@payload/components/RowLinkLabel",
			},
		},
	},
];

const TitleWithImage: Block = {
	slug: "title-with-image",
	interfaceName: "TitleWithImage",
	imageURL: "/payload-imgs/TitleWithImage.png",
	fields: fields,
};

export default TitleWithImage;
