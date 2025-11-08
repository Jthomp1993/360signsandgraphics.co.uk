import parse from "html-react-parser";

export default function toP(text: string) {
	const html = "<p>" + text.replace(/\n/g, "</p>\n<p>") + "</p>";

	return parse(html);
}
