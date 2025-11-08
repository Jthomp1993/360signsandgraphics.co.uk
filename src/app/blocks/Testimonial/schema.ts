import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import { lexicalMedium } from "@payload/fields/lexical";
import link from "@payload/fields/link";

export const fields: Field[] = [
	blockName(),
	{
		name: "image",
		type: "upload",
		relationTo: "media",
		required: true,
	},
	{
		name: "quote",
		type: "textarea",
		required: true,
	},
	{
		name: "name",
		type: "text",
	},
	{
		name: "role",
		type: "text",
	},
];

const Testimonial: Block = {
	slug: "testimonial",
	interfaceName: "Testimonial",
	imageURL: "/payload-imgs/Testimonial.png",
	fields: fields,
};

export default Testimonial;
