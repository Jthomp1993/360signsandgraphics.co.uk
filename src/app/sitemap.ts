import type { MetadataRoute } from "next";
import type {
	CollectionSlug,
	DataFromCollectionSlug,
	TypedLocale,
} from "payload";

import { SEOCollections } from "@payload-config";

import getByCollection from "@actions/getByCollection";

type getUrl = (
	doc: DataFromCollectionSlug<CollectionSlug>,
	locale?: TypedLocale,
) => string;

const getUrl: getUrl = (doc, locale) => {
	let url = "";
	let slug = "";

	if ("slug" in doc && doc.slug) {
		slug = doc.slug;
	}

	if ("url" in doc && doc.url) {
		url = doc.url;
	}

	return (
		process.env.NEXT_PUBLIC_SITE_URL! +
		(locale ? "/" + locale : "") +
		(slug == "homepage" ? "" : url)
	);
};

const collectionSitemap = async (
	collentionSlug: SEOCollections,
): Promise<MetadataRoute.Sitemap> => {
	const docs = await getByCollection(collentionSlug, {
		depth: 1,
		limit: 999999,
		select: {
			slug: true,
			url: true,
			unpublished: true,
			category: true,
		},
		where: {
			_status: { equals: "published" },
			slug: { not_equals: "" },
		},
	});

	return docs.docs.map((doc) => {
		const { updatedAt } = doc;

		return {
			url: getUrl(doc),
			lastModified: updatedAt,
			changeFrequency: "weekly",
			priority: 0.7,
		};
	});
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemapCollections: SEOCollections[] = ["pages"];

	return (
		await Promise.all(
			sitemapCollections.map(async (slug) => await collectionSitemap(slug)),
		)
	).flat();
}
