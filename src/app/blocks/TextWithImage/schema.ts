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
		name: "aspectRatio",
		type: "select",
		options: [
			{
				label: "Square",
				value: "square",
			},
			{
				label: "Portrait",
				value: "portrait",
			},
		],
		defaultValue: "square",
	},
	...lexicalMedium("copy"),
	link(),
];

const TextWithImage: Block = {
	slug: "text-with-image",
	interfaceName: "TextWithImage",
	imageURL: "/payload-imgs/TextWithImage.png",
	fields: fields,
};

export default TextWithImage;
