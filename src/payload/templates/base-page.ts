import type { Field } from "payload";

import {
	HTMLConverterFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";

import { StylizedParagraphFeature } from "@payload/features/paragraphFeature/server";
import { LinkHTMLConverter } from "@payload/lexical/LinkHTMLConverter";

const BasePageTemplate = (): Field => ({
	name: "basePageTemplate",
	type: "group",
	localized: true,
	label: false,
	interfaceName: "BasePageTemplate",
	fields: [
		{
			type: "richText",
			name: "content",
			required: true,
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => {
					return [
						...defaultFeatures,
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
		lexicalHTML("content", {
			name: "content_html",
		}),
	],
	admin: {
		condition: (_, siblingData) => {
			return siblingData.template == "base-page";
		},
	},
});

export default BasePageTemplate;
