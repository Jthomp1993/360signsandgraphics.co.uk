import type { Field } from "payload";

import {
	HTMLConverterFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";

import { StylizedParagraphFeature } from "@payload/features/paragraphFeature/server";
import { LinkHTMLConverter } from "@payload/lexical/LinkHTMLConverter";
import deepMerge from "@payload/util/deepMerge";

export const lexicalFull = (name: string, overrides = {}) => [
	deepMerge<Field, Partial<Field>>(
		{
			type: "richText",
			name: name,
			editor: lexicalEditor({
				features: ({ defaultFeatures, rootFeatures }) => {
					const inludeFeatures = [
						"toolbarInline",
						"link",
						"paragraph",
						"underline",
						"italic",
						"bold",
						"orderedList",
						"unorderedList",
						"heading",
						"stylized-paragraph",
					];

					const features = defaultFeatures.filter(({ key }) =>
						inludeFeatures.includes(key),
					);

					return [
						...features,
						HTMLConverterFeature({
							converters: ({ defaultConverters }) => [
								...defaultConverters,
								LinkHTMLConverter,
							],
						}),
						StylizedParagraphFeature(),
					];
				},
			}),
		},
		overrides,
	),
	lexicalHTML(name, {
		name: `${name}HTML`,
	}),
];

type LexicalMedium = (
	name: string,
	inludeFeatures?: (
		| "align"
		| "toolbarInline"
		| "link"
		| "upload"
		| "heading"
		| "blockquote"
		| "orderedList"
		| "unorderedList"
		| "paragraph"
		| "stylized-paragraph"
		| "underline"
		| "italic"
		| "bold"
		| string
	)[],
	overrides?: Record<string, unknown>,
) => Field[];

export const lexicalMedium: LexicalMedium = (
	name,
	inludeFeatures = [
		"align",
		"link",
		"paragraph",
		"stylized-paragraph",
		"orderedList",
		"unorderedList",
		"underline",
		"italic",
		"bold",
	],
	overrides = {},
) => {
	inludeFeatures.push("toolbarInline");

	return [
		deepMerge<Field, Partial<Field>>(
			{
				type: "richText",
				name: name,
				editor: lexicalEditor({
					features: ({ defaultFeatures }) => {
						const features = defaultFeatures.filter(({ key }) =>
							inludeFeatures.includes(key),
						);

						return [
							...features,
							HTMLConverterFeature({
								converters: ({ defaultConverters }) => [
									...defaultConverters,
									LinkHTMLConverter,
								],
							}),
							inludeFeatures.includes("stylized-paragraph")
								? StylizedParagraphFeature()
								: null,
						].filter((feature) => feature !== null);
					},
				}),
			},
			overrides,
		),
		lexicalHTML(name, {
			name: `${name}HTML`,
		}),
	];
};
