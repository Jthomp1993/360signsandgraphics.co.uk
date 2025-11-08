import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";

const fields: Field[] = [
	blockName(),
	{
		name: "title",
		type: "textarea",
		required: true,
		admin: {
			description:
				"Use the | symbol to indicate where a video block should be inserted",
		},
	},
	{
		name: "image",
		type: "upload",
		relationTo: "media",
		required: true,
	},
	{
		name: "vimeoVideoId",
		type: "text",
	},
];

const HeroHomepage: Block = {
	slug: "hero-homepage",
	interfaceName: "HeroHomepage",
	imageURL: "/payload-imgs/HeroHomepage.png",
	fields: fields,
};

export default HeroHomepage;
