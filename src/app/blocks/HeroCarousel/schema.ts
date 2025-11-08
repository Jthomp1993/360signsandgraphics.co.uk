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
		name: "copy",
		type: "textarea",
	},
	{
		name: "images",
		type: "upload",
		relationTo: "media",
		hasMany: true,
		required: true,
	},
];

const HeroCarousel: Block = {
	slug: "hero-carousel",
	interfaceName: "HeroCarousel",
	imageURL: "/payload-imgs/HeroCarousel.png",
	fields: fields,
};

export default HeroCarousel;
