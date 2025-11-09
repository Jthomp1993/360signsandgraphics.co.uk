import type { Block, Field } from "payload";

import blockName from "@payload/fields/blockName";
import link from "@payload/fields/link";

export const fields: Field[] = [
	blockName(),
    {
        name: "label",
        type: "text",
        required: true,
    },
    {
        name: "heading",
        type: "text",
        required: true,
    },
    {
        name: "description",
        type: "text",
        required: true,
    },
	{
		name: "image",
		type: "upload",
		relationTo: "media",
		required: true,
	},
	link(),
];

const HeroHome: Block = {
	slug: "hero-home",
	interfaceName: "HeroHome",
	imageURL: "/payload-imgs/TextWithImage.png",
	fields: fields,
};

export default HeroHome;
