import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import link from "@payload/fields/link";

const fields: Field[] = [
	blockName(),
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
				admin: {
					description: "Recommended size: 794x1050",
				},
			},
			{
				name: "title",
				type: "textarea",
				label: "Title",
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

const OurPillars: Block = {
	slug: "our-pillars",
	labels: {
		singular: "Our Pillars",
		plural: "Our Pillars",
	},
	interfaceName: "OurPillars",
	imageURL: "/payload-imgs/OurPillars.png",
	fields: fields,
};

export default OurPillars;
