import parse, { domToReact } from "html-react-parser";

export default function toBr(text: string): ReturnType<typeof domToReact> {
	if (!text || typeof text !== "string") return ""; // Check if input is a string

	const html = text.replaceAll("\n", "<br />");

	return parse(html); // Return parsed HTML
}
