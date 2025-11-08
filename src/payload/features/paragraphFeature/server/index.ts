import type {
	SerializedElementNode,
	SerializedLexicalNode,
	Spread,
} from "lexical";

import {
	convertLexicalNodesToHTML,
	createNode,
	createServerFeature,
} from "@payloadcms/richtext-lexical";
import { ParagraphNode } from "lexical";

import {
	SerializedStylizedParagraphNode,
	StylizedParagraphNode,
} from "../StylizedParagraphNode";

export type StylizedParagraphFeatureProps = {
	enabledStyles?: string[];
};

/**
 * Server-side feature implementation for stylized paragraphs
 */
export const StylizedParagraphFeature = createServerFeature<
	StylizedParagraphFeatureProps,
	StylizedParagraphFeatureProps,
	StylizedParagraphFeatureProps
>({
	feature: ({ props }) => {
		if (!props) {
			props = {};
		}

		const {
			enabledStyles = [
				"paragraph-xxl",
				"paragraph-xl",
				"paragraph-l",
				"paragraph-m",
				"paragraph-s",
				"paragraph-xs",
			],
		} = props;

		return {
			ClientFeature:
				"@payload/features/paragraphFeature/client#StylizedParagraphFeatureClient",
			clientFeatureProps: { enabledStyles },
			nodes: [
				createNode({
					converters: {
						html: {
							converter: async ({
								converters,
								currentDepth,
								depth,
								draft,
								node,
								overrideAccess,
								parent,
								req,
								showHiddenFields,
							}) => {
								// Cast node to our custom type
								const stylizedNode = node as SerializedStylizedParagraphNode;

								// Convert children to HTML
								const childrenText = await convertLexicalNodesToHTML({
									converters,
									currentDepth,
									depth,
									draft,
									lexicalNodes: node.children,
									overrideAccess,
									parent: {
										...node,
										parent,
									},
									req,
									showHiddenFields,
								});

								// Apply styles based on the serialized node
								const className = stylizedNode.style
									? `class="${stylizedNode.style}"`
									: "";

								// Handle other paragraph formatting
								const style = [
									node.format ? `text-align: ${node.format};` : "",
									node.indent > 0
										? `padding-inline-start: ${node.indent * 40}px;`
										: "",
								]
									.filter(Boolean)
									.join(" ");
									
								// Render the paragraph with appropriate styling
								return `<p${className ? ` ${className}` : ""}${style ? ` style='${style}'` : ""}>${childrenText}</p>`;
							},
							nodeTypes: [StylizedParagraphNode.getType()],
						},
					},
					node: StylizedParagraphNode,
				}),
			],
			sanitizedServerFeatureProps: { enabledStyles },
		};
	},
	key: "stylized-paragraph",
});
