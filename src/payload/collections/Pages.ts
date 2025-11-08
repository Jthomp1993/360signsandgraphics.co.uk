import type { CollectionConfig } from "payload";

import { publicReadOnly } from "@/access/publicReadOnly";

import { slugField } from "@payload/fields/slug";
import { url } from "@payload/fields/url";
import BasePageTemplate from "@payload/templates/base-page";
import ContactUsTemplate from "@payload/templates/contact-us";
import revalidateAfterChange from "@payload/util/revalidateAfterChange";

import PageBuilderTemplate from "../templates/page-builder";

const Pages: CollectionConfig = {
	slug: "pages",
	access: publicReadOnly,
	admin: {
		useAsTitle: "title",
		preview: (doc) => {
			return `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview?path=${doc.url}`;
		},
	},
	defaultPopulate: {
		title: true,
		slug: true,
		url: true,
	},
	fields: [
		{
			name: "title",
			type: "text",
			localized: true,
			required: true,
		},
		slugField("title"),
		url(async (data) => `/${data.slug}`),
		{
			name: "template",
			type: "select",
			options: [
				{
					label: "Page Builder",
					value: "page-builder",
				},
				{
					label: "Base Page",
					value: "base-page",
				},
				{
					label: "Contact Us",
					value: "contact-us",
				},
				{
					label: "What We Do Subpage",
					value: "what-we-do-subpage",
				},
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "accentColor",
			type: "text",
			defaultValue: "#9340FF",
			admin: {
				description: "Hex color code for the page accent color",
				condition: (_, siblingData) =>
					siblingData.template === "what-we-do-subpage",
				position: "sidebar",
			},
		},
		PageBuilderTemplate(),
		BasePageTemplate(),
		ContactUsTemplate(),
	],
	versions: {
		drafts: true,
		maxPerDoc: 2,
	},
	hooks: {
		afterChange: [revalidateAfterChange],
	},
};

export default Pages;
