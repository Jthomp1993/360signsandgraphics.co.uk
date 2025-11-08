import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";

const fields: Field[] = [
	blockName(),
	{
		name: "title",
		type: "textarea",
		required: true,
	},
	{
		name: "image",
		type: "upload",
		relationTo: "media",
		required: true,
	},
];

const HeroWithImage: Block = {
	slug: "hero-with-image",
	interfaceName: "HeroWithImage",
	imageURL: "/payload-imgs/HeroWithImage.png",
	fields: fields,
};

export default HeroWithImage;