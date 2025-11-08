export type readFile = Promise<{
	filename: string;
	content: any;
	type: string;
	disposition: string;
}>;

export default function readFile(file: File): readFile {
	return new Promise((resolve, reject) => {
		var fr = new FileReader();
		fr.onload = () => {
			if (!fr.result) return;

			resolve({
				content: fr.result.toString().split(",")[1],
				filename: file.name,
				type: file.type,
				disposition: "attachment",
			});
		};
		fr.onerror = reject;
		fr.readAsDataURL(file);
	});
}
