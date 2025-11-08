import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use path.resolve to create absolute paths
const blocksDir = path.resolve(__dirname, "../src/app/blocks");
const publicDir = path.resolve(__dirname, "../public/payload-imgs");

// Ensure the target directory exists
try {
	await fs.mkdir(publicDir, { recursive: true });
} catch (err) {
	console.log("Public directory already exists or couldn't be created");
}

try {
	const dirsRaw = await fs.readdir(blocksDir, {
		withFileTypes: true,
	});
	
	// Process each directory
	for (const dirent of dirsRaw.filter(dirent => dirent.isDirectory())) {
		const sourceComponentPath = path.join(blocksDir, dirent.name);
		const files = await fs.readdir(sourceComponentPath);
		
		// Process each PNG file
		for (const filename of files.filter(filename => filename.includes(".png"))) {
			const sourceFilePath = path.join(sourceComponentPath, filename);
			const targetFilePath = path.join(publicDir, `${dirent.name}.png`);
			
			try {
				// Check if file already exists
				await fs.access(targetFilePath);
				console.log(`File exists for ${dirent.name}`);
			} catch (err) {
				// File doesn't exist, copy it
				const fileContent = await fs.readFile(sourceFilePath);
				await fs.writeFile(targetFilePath, fileContent);
				console.log(
					`Created preview image for ${dirent.name} - public/payload-imgs/${dirent.name}.png`
				);
			}
		}
	}
} catch (err) {
	console.error(`Error: ${err.message}`);
}
