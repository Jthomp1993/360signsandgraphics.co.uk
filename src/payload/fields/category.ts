import type { CollectionSlug, Field } from "payload";

type Category = (category: CollectionSlug[], required?: boolean) => Field;

export const categoryField: Category = (category, required = false) => ({
	name: "category",
	type: "relationship",
	relationTo: category,
	hasMany: true,
	required: required,
	admin: {
		position: "sidebar",
		isSortable: true,
	},
	maxDepth: 10,
});
