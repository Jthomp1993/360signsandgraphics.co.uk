import type { GlobalConfig } from "payload";

import { lexicalMedium } from "@payload/fields/lexical";
import link from "@payload/fields/link";
import revalidateGlobalsAfterChange from "@payload/util/revalidateGlobalsAfterChange";

const SitewideContent: GlobalConfig = {
	slug: "sitewideContent",
	access: {
		read: () => true,
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					name: "header",
					interfaceName: "PrimaryHeader",
					fields: [
						{
							name: "navigation",
							type: "array",
							required: true,
							maxRows: 8,
							localized: true,
							fields: [link({ overrides: { required: true } })],
							admin: {
								initCollapsed: true,
								components: {
									RowLabel: "@payload/components/RowLinkLabel",
								},
							},
						},
						{
							name: "sideNavigation",
							type: "array",
							localized: true,
							fields: [link({ overrides: { required: true } })],
							admin: {
								initCollapsed: true,
								components: {
									RowLabel: "@payload/components/RowLinkLabel",
								},
							},
						},
						{
							name: "copy1",
							type: "textarea",
						},
						{
							name: "copy2",
							type: "textarea",
						},
					],
				},
				{
					label: "Social Links",
					fields: [
						{
							name: "socialLinks",
							type: "array",
							interfaceName: "SocialLinks",
							fields: [
								{
									name: "socialNetwork",
									type: "select",
									required: true,
									options: ["Facebook", "Instagram", "X", "LinkedIn", "YouTube"],
								},
								{
									name: "url",
									type: "text",
									required: true,
									admin: {
										placeholder: "https://...",
									},
								},
							],
							admin: {
								initCollapsed: true,
								components: {
									RowLabel: "@payload/components/SocialLinkLabel",
								},
							},
						},
					],
				},
				{
					label: "Footer",
					name: "footer",
					interfaceName: "PrimaryFooter",
					fields: [
						{
							name: "navigation",
							type: "array",
							required: true,
							maxRows: 8,
							localized: true,
							fields: [link({ overrides: { required: true } })],
							admin: {
								initCollapsed: true,
								components: {
									RowLabel: "@payload/components/RowLinkLabel",
								},
							},
						},
						{
							name: "contacts",
							type: "group",
							fields: [
								{
									name: "label",
									type: "text",
									required: true,
								},
								{
									name: "items",
									type: "array",
									fields: [
										{
											name: "label",
											type: "text",
											required: true,
										},
										...lexicalMedium("value", ["link"]),
									],
									admin: {
										initCollapsed: true,
										components: {
											RowLabel: "@payload/components/RowLabel",
										},
									},
								},
							],
						},
						...lexicalMedium("copyright", ["link"]),
						...lexicalMedium("devCopyright", ["link"]),
					],
				},
			],
		},
	],
	hooks: {
		afterChange: [revalidateGlobalsAfterChange],
	},
};

export default SitewideContent;
