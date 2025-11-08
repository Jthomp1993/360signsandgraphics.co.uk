import type { HTMLConverter } from "@payloadcms/richtext-lexical";
import type { CollectionSlug, DataFromCollectionSlug } from "payload";

import { convertLexicalNodesToHTML } from "@payloadcms/richtext-lexical";

import getById from "@actions/getById";

export const LinkHTMLConverter: HTMLConverter<any> = {
	async converter({
		converters,
		currentDepth,
		depth,
		draft,
		node,
		overrideAccess,
		parent,
		req,
		showHiddenFields,
	}) {
		const childrenText = await convertLexicalNodesToHTML({
			converters,
			lexicalNodes: node.children,
			parent: {
				...node,
				parent,
			},
			req,
			currentDepth,
			depth,
			draft,
			overrideAccess,
			showHiddenFields,
		});

		const rel: string = node.fields.newTab ? ' rel="noopener noreferrer"' : "";
		const target: string = node.fields.newTab ? ' target="_blank"' : "";

		let href: string = node.fields.url;
		if (node.fields.linkType === "internal") {
			const doc = (await getById(
				node.fields.doc.value,
				node.fields.doc.relationTo,
				0,
			)) as DataFromCollectionSlug<CollectionSlug>;

			if ("url" in doc && doc.url !== undefined) {
				href = doc.url || "";
			}
		}

		return `<a href="${href}"${target}${rel}>${childrenText}</a>`;
	},
	nodeTypes: ["link"],
};
