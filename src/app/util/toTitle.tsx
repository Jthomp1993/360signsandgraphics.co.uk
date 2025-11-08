import parse from "html-react-parser";

export default function toTitle(text: string) {
	if (!text) return "";

	const html = text
		.replaceAll("\n", "<br />")
		.replaceAll("{", "<b>")
		.replaceAll("}", "</b>");

	return parse(html);
}
