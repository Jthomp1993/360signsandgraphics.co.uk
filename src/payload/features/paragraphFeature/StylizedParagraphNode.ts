import {
	EditorConfig,
	DOMExportOutput,
	LexicalEditor,
	NodeKey,
	ParagraphNode,
	SerializedParagraphNode,
	Spread,
} from "lexical";

/**
 * Serialized form of the StylizedParagraphNode for persistence
 */
export type SerializedStylizedParagraphNode = Spread<
	{
		style: string;
		type: "stylized-paragraph";
		version: 1;
	},
	SerializedParagraphNode
>;

/**
 * Custom paragraph node that adds styling capabilities
 * Extends the standard Lexical ParagraphNode with style information
 */
export class StylizedParagraphNode extends ParagraphNode {
	/** The style class to apply to this paragraph */
	__style: string;

	/**
	 * Returns the node type
	 */
	static getType(): string {
		return "stylized-paragraph";
	}

	/**
	 * Creates a new stylized paragraph node
	 * @param style The CSS class to apply to this paragraph
	 * @param key Optional node key
	 */
	constructor(style: string = "", key?: NodeKey) {
		super(key);
		this.__style = style;
	}

	/**
	 * Creates the DOM element for this node
	 * @param config The editor configuration
	 * @returns The created DOM element
	 */
	createDOM(config: EditorConfig): HTMLElement {
		const dom = super.createDOM(config);

		// Base Lexical paragraph class - maintain it for proper editor styling
		const baseClass = "LexicalEditorTheme__paragraph";

		// Add our base stylized paragraph class
		const stylizedClass = "stylized-paragraph";

		// Add the specific style class if it exists in our CSS module
		const styleClass = this.__style;

		// Combine all classes
		const className = [baseClass, stylizedClass, styleClass]
			.filter(Boolean)
			.join(" ");

		dom.className = className;

		return dom;
	}

	/**
	 * Update the DOM element based on changes
	 */
	updateDOM(prevNode: ParagraphNode, dom: HTMLElement, config: EditorConfig): boolean {
		const prevStyleNode = prevNode as StylizedParagraphNode;
		return prevStyleNode.__style !== this.__style;
	}

	/**
	 * Creates a DOM element for exporting content (copy/paste or serialization)
	 * @param editor The editor instance
	 * @returns The DOM node and any post-processing required
	 */
	exportDOM(editor: LexicalEditor): DOMExportOutput {
		const { element, after } = super.exportDOM(editor);
		
		// If we have a valid DOM element and a style
		if (element && this.__style && element instanceof HTMLElement) {
			// Apply the style as a class to the element
			element.classList.add(this.__style);
			element.classList.add('stylized-paragraph');
		}
		
		return {
			element,
			after
		};
	}

	/**
	 * Creates a copy of this node
	 * @param node The node to clone
	 * @returns A new node with the same style
	 */
	static clone(node: StylizedParagraphNode): StylizedParagraphNode {
		return new StylizedParagraphNode(node.__style, node.__key);
	}

	/**
	 * Gets the current style class
	 * @returns The applied style class
	 */
	getStyle(): string {
		return this.__style;
	}

	/**
	 * Sets a new style class
	 * @param styleClass The CSS class to apply
	 * @returns This node for chaining
	 */
	setStyle(styleClass: string): this {
		const writable = this.getWritable();
		writable.__style = styleClass;
		return writable as this;
	}

	/**
	 * Serializes the node for persistence
	 * @returns Serialized representation of this node
	 */
	exportJSON(): SerializedStylizedParagraphNode {
		return {
			...super.exportJSON(),
			style: this.__style,
			type: "stylized-paragraph",
			version: 1,
		};
	}

	/**
	 * Creates a new node from serialized data
	 * @param serializedNode The serialized node data
	 * @returns A new StylizedParagraphNode
	 */
	static importJSON(
		serializedNode: SerializedStylizedParagraphNode,
	): StylizedParagraphNode {
		// Create the node with the style from the serialized node
		const node = new StylizedParagraphNode(serializedNode.style);

		// Apply paragraph formatting properties if they exist
		if (serializedNode.format !== undefined) {
			node.setFormat(serializedNode.format);
		}

		if (serializedNode.indent !== undefined) {
			node.setIndent(serializedNode.indent);
		}

		if (serializedNode.direction !== undefined) {
			node.setDirection(serializedNode.direction);
		}

		return node;
	}
}
