import type { Field as FieldType } from "payload";

import deepMerge from "@/payload/util/deepMerge";

type UrlGenerator<T> = (data: Partial<T>) => Promise<string>;

type Url<T> = (
	generator?: UrlGenerator<T>,
	overrides?: Partial<FieldType>,
) => FieldType;

export const url: Url<any> = (
	generator = (data: Partial<any>) => new Promise(() => `/${data.slug}`),
	overrides = {},
) =>
	deepMerge<FieldType, Partial<FieldType>>(
		{
			name: "url",
			type: "text",
			hooks: {
				// don't save url in database
				beforeChange: [() => null],
				afterRead: [
					async ({ siblingData }) => {
						if (!siblingData) return null;

						return await generator(siblingData);
					},
				],
			},
			virtual: true,
			admin: {
				position: "sidebar",
				components: {
					Field: "@payload/fields/url/index.client",
				},
			},
		},
		overrides,
	);
