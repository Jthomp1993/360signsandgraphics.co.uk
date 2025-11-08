import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import { lexicalMedium } from "@payload/fields/lexical";
import link from "@payload/fields/link";

const fields: Field[] = [
	blockName(),
	{
		name: "title",
		type: "text",
		required: true,
	},
	...lexicalMedium("copy"),
	link(),
];

const TextReveal: Block = {
	slug: "text-reveal",
	interfaceName: "TextReveal",
	imageURL: "/payload-imgs/TextReveal.png",
	fields: fields,
};

export default TextReveal;
