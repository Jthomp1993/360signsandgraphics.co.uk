import type { Block, Field } from "payload";
import blockName from "@payload/fields/blockName";
import link from "@payload/fields/link";

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
		admin: {
			description:
				"Use the | symbol to indicate where a image block should be inserted",
		},
	},
	{
		name: "images",
		type: "array",
		fields: [
			{
				name: "image",
				type: "upload",
				relationTo: "media",
				required: true,
			},
		],
	},
	link(),
	

];

const StatementText: Block = {
	slug: "statement-text",
	interfaceName: "StatementText",
	imageURL: "/payload-imgs/StatementText.png",
	fields: fields,
};

export default StatementText;
