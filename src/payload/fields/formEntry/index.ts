import type { Field } from "payload";

export const formEntry: () => Field = () => ({
	name: "formEntryHTML",
	type: "ui",
	admin: {
		components: {
			Field: "@payload/fields/formEntry/index.client",
		},
	},
});
