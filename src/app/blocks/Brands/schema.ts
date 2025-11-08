import type { Block, Field } from "payload";

import { fields as textWithImageFields } from "@/app/blocks/TextWithImage/schema";

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
		name: "images",
		type: "upload",
		relationTo: "media",
		required: true,
		hasMany: true,
	},
	{
		name: "textWithImage",
		type: "group",
		fields: textWithImageFields,
	},
];

const Brands: Block = {
	slug: "brands",
	labels: {
		singular: "Brands",
		plural: "Brands",
	},
	interfaceName: "Brands",
	imageURL: "/payload-imgs/Brands.png",
	fields: fields,
};

export default Brands;
