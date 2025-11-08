import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import { lexicalMedium } from "@payload/fields/lexical";
import link from "@payload/fields/link";

export const fields: Field[] = [
	blockName(),
	{
		name: "title",
		type: "textarea",
		label: "Title",
	},
	{
		name: "titleStyle",
		type: "select",
		label: "Title Style",
		defaultValue: "default",
		options: [
			{
				label: "Default",
				value: "default",
			},
			{
				label: "Small",
				value: "small",
			},
		],
	},
	...lexicalMedium("copy"),
	link(),
];

const TextBlock: Block = {
	slug: "text-block",
	interfaceName: "TextBlock",
	imageURL: "/payload-imgs/TextBlock.png",
	fields: fields,
};

export default TextBlock;
