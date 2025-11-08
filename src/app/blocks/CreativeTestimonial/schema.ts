import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";

const fields: Field[] = [
	blockName(),
	{
		name: "subTitle",
		type: "text",
	},
	{
		name: "title",
		type: "textarea",
		required: true,
	},
	{
		name: "name",
		type: "text",
		required: true,
	},
	{
		name: "role",
		type: "text",
		required: true,
	},
	{
		name: "slide1",
		type: "group",
		fields: [
			{
				name: "text",
				type: "textarea",
				required: true,
			},
		],
	},
	{
		name: "slide2",
		type: "group",
		fields: [
			{
				name: "image",
				type: "upload",
				relationTo: "media",
				required: true,
			},
			{
				name: "text1",
				type: "textarea",
				required: true,
			},
			{
				name: "text2",
				type: "textarea",
				required: true,
			},
		],
	},
];

const CreativeTestimonial: Block = {
	slug: "creative-testimonial",
	interfaceName: "CreativeTestimonial",
	imageURL: "/payload-imgs/CreativeTestimonial.png",
	fields: fields,
};

export default CreativeTestimonial;
