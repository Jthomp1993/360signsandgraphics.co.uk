import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import { lexicalMedium } from "@payload/fields/lexical";

const fields: Field[] = [
	blockName(),
	{
		name: "title",
		type: "textarea",
		required: true,
	},
	...lexicalMedium("copy"),
	{
		name: "image",
		type: "upload",
		relationTo: "media",
		required: true,
	},
];

const Hero2: Block = {
	slug: "hero2",
	interfaceName: "Hero2",
	imageURL: "/payload-imgs/Hero2.png",
	fields: fields,
};

export default Hero2;
