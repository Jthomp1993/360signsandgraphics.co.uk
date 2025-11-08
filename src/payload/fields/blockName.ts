import type { Field } from "payload";

const blockName = (field: string = "title"): Field => ({
	name: "blockName",
	type: "text",
	admin: {
		hidden: true,
	},
	hooks: {
		beforeChange: [() => null],
		afterRead: [
			({ siblingData }) => {
				if (!siblingData) return null;

				return siblingData[field];
			},
		],
	},
});

export default blockName;
