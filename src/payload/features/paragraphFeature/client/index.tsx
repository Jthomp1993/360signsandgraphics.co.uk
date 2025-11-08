"use client";

import type { StylizedParagraphFeatureProps } from "../server/index.js";

import { $setBlocksType } from "@lexical/selection";
import { ToolbarGroup } from "@payloadcms/richtext-lexical";
import {
	createClientFeature,
	slashMenuBasicGroupWithItems,
	toolbarTextDropdownGroupWithItems,
} from "@payloadcms/richtext-lexical/client";
import { $getSelection, $isRangeSelection } from "lexical";
import React from "react";

import { StylizedParagraphNode } from "../StylizedParagraphNode";

// Icon components for different paragraph styles
const IconComponent = () => (
	<svg
		aria-hidden="true"
		className="icon"
		fill="currentColor"
		focusable="false"
		height="20"
		viewBox="0 0 20 20"
		width="20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M11.708 14.5H7.79785V13.9414H8.01367C9.00391 13.9414 9.15625 13.9033 9.15625 13.6113V6.70508H8.07715C6.82031 6.70508 6.73145 7.08594 6.28711 8.67285H5.80469L5.91895 6.12109H13.5869L13.7012 8.67285H13.2188C12.7744 7.08594 12.6855 6.70508 11.4287 6.70508H10.3496V13.6113C10.3496 13.9033 10.502 13.9414 11.4922 13.9414H11.708V14.5Z"
			fill="currentColor"
		/>
	</svg>
);

/**
 * Create a custom stylized paragraph node
 */
const $createStylizedParagraph = (style: string) => {
	return new StylizedParagraphNode(style);
};

/**
 * Format style name for display
 */
const formatStyleName = (style: string): string => {
	// Split by hyphen, capitalize first word and make size uppercase
	const parts = style.split("-");
	// Capitalize first word (e.g., "paragraph" to "Paragraph")
	const firstPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
	// Make size part uppercase (e.g., "xxl" to "XXL")
	const sizePart = parts[1]?.toUpperCase() || "";
	
	return `${firstPart} ${sizePart}`;
};

export const StylizedParagraphFeatureClient =
	createClientFeature<StylizedParagraphFeatureProps>(({ props }) => {
		const {
			enabledStyles = [
				"paragraph-xxl",
				"paragraph-xl",
				"paragraph-l",
				"paragraph-m",
				"paragraph-s",
				"paragraph-xs",
			],
		} = props || {};

		const toolbarGroups: ToolbarGroup[] = [
			toolbarTextDropdownGroupWithItems(
				enabledStyles.map((style, i) => {
					return {
						ChildComponent: IconComponent,
						isActive: ({ selection }) => {
							if (!$isRangeSelection(selection)) {
								return false;
							}

							for (const node of selection.getNodes()) {
								// Check if it's our custom node with matching style
								if (
									node instanceof StylizedParagraphNode &&
									node.getStyle() === style
								) {
									continue;
								}

								const parent = node.getParent();
								// Check if parent is our custom node with matching style
								if (
									parent instanceof StylizedParagraphNode &&
									parent.getStyle() === style
								) {
									continue;
								}

								return false;
							}
							return true;
						},
						key: style,
						label: () => formatStyleName(style),
						onSelect: ({ editor }) => {
							editor.update(() => {
								const selection = $getSelection();
								if (selection) {
									$setBlocksType(selection, () =>
										$createStylizedParagraph(style),
									);
								}
							});
						},
						order: i + 40,
					};
				}),
			),
		];

		return {
			nodes: [StylizedParagraphNode],
			sanitizedClientFeatureProps: props,
			slashMenu: {
				groups: [
					slashMenuBasicGroupWithItems(
						enabledStyles.map((style: string) => {
							return {
								Icon: IconComponent,
								key: `${style}`,
								keywords: ["paragraph", "style", style],
								label: () => formatStyleName(style),
								onSelect: ({ editor }) => {
									editor.update(() => {
										const selection = $getSelection();
										if (selection) {
											$setBlocksType(selection, () =>
												$createStylizedParagraph(style),
											);
										}
									});
								},
							};
						}),
					),
				],
			},
			toolbarFixed: {
				groups: toolbarGroups,
			},
			toolbarInline: {
				groups: toolbarGroups,
			},
		};
	});
