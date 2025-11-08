import type { CollectionAfterChangeHook } from "payload";

const revalidateAfterChange: CollectionAfterChangeHook = async ({
	collection,
	doc: { id, slug },
	operation,
}) => {
	if (operation === "create" || operation === "update") {
		await Promise.all([
			// Revalidate by Slug
			fetch(
				`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?tag=${collection.slug}-${slug}`,
			),
			fetch(
				`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?tag=meta-${collection.slug}-${slug}`,
			),
			// Revalidate by ID
			fetch(
				`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?tag=${collection.slug}-${id}`,
			),
			// Revalidate whole collection
			fetch(
				`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?tag=${collection.slug}`,
			),
		]);
	}
};

export default revalidateAfterChange;
