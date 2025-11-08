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
		name: "items",
		type: "array",
		required: true,
		fields: [
			{
				name: "title",
				type: "textarea",
				required: true,
			},
		],
		admin: {
			initCollapsed: true,
			components: {
				RowLabel: "@payload/components/RowTitleLabel",
			},
		},
	},
];

const CardsCarousel: Block = {
	slug: "cards-carousel",
	interfaceName: "CardsCarousel",
	imageURL: "/payload-imgs/CardsCarousel.png",
	fields: fields,
};

export default CardsCarousel;
