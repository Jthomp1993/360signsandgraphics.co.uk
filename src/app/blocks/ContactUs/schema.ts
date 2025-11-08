import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import { lexicalMedium } from "@payload/fields/lexical";

export const fields: Field[] = [
	blockName(),
	{
		name: "title",
		type: "text",
		required: true,
	},
	...lexicalMedium("copy", undefined, { required: true }),
	{
		name: "contacts",
		type: "array",
		fields: [
			{
				name: "label",
				type: "text",
				required: true,
			},
			{
				name: "link",
				type: "text",
			},
		],
		admin: {
			initCollapsed: true,
			components: {
				RowLabel: "@payload/components/RowLabel",
			},
		},
	},
	{
		name: "people",
		type: "array",
		maxRows: 2,
		fields: [
			{
				name: "image",
				type: "upload",
				relationTo: "media",
				required: true,
			},
			{
				name: "activeImage",
				type: "upload",
				relationTo: "media",
			},
			{
				name: "name",
				type: "text",
				required: true,
			},
			...lexicalMedium("copy", undefined, { required: true }),
			{
				name: "contacts",
				type: "array",
				fields: [
					{
						name: "label",
						type: "text",
						required: true,
					},
					{
						name: "value",
						type: "text",
						required: true,
					},
					{
						name: "link",
						type: "text",
					},
				],
				admin: {
					initCollapsed: true,
					components: {
						RowLabel: "@payload/components/RowLabel",
					},
				},
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

const ContactUs: Block = {
	slug: "contact-us",
	interfaceName: "ContactUs",
	imageURL: "/payload-imgs/ContactUs.png",
	fields: fields,
};

export default ContactUs;
