import type { Field } from "payload";

type Category = (name: string, required?: boolean) => Field;

export const colorField: Category = (name, required = false) => ({
	name: name,
	type: "text",
	required: required,
	validate: (val: any) => {
		return !val || val?.includes("#") || `${val} is not a valid hex color`;
	},
});
