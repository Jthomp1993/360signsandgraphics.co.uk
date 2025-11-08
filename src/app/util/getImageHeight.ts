export default function getImageHeight(
	baseWidth: number,
	image: { height?: number | null; width?: number | null },
): number {
	return (baseWidth * (image.height || 1)) / (image.width || 1);
}
