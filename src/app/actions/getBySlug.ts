import type { CollectionSlug, TypedLocale } from "payload";

import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";

import getPayloadMemo from "@clients/payloadClient";

const getBySlug = async (
	slug: string,
	collection: CollectionSlug = "pages",
	locale: TypedLocale = null,
	depth: number = 2,
) => {
	if (typeof slug === "undefined") return null;

	const { isEnabled: draft } = await draftMode();

	return unstable_cache(
		async () => {
			const payload = await getPayloadMemo();

			console.log(`fetch by slug ${slug} ${locale} ${performance.now()}`);

			const page = (
				await payload.find({
					collection: collection,
					draft,
					where: {
						slug: {
							equals: slug,
						},
					},
					limit: 1,
					overrideAccess: draft,
					depth: depth,
					locale: locale,
				})
			).docs[0];

			if (page) return page;

			const fallbackPage = (
				await payload.find({
					collection: collection,
					draft,
					where: {
						slug: {
							equals: slug,
						},
					},
					limit: 1,
					overrideAccess: draft,
					depth: depth,
					//locale: "en",
				})
			).docs[0];

			return fallbackPage;
		},
		draft ? [] : [`${collection}-${slug}`, `${collection}-${slug}-${locale}`],
		draft
			? {}
			: {
					revalidate: 3600 * 24, // 24 hours
					tags: [
						"all",
						`${collection}-${slug}`,
						`${collection}-${slug}-${locale}`,
					],
				},
	)();
};

export default getBySlug;
