import type { CollectionSlug, TypedLocale } from "payload";

import { Metadata } from "next";
import { unstable_cache } from "next/cache";

import getBySlug from "@actions/getBySlug";

const generateMetaBySlug = async (
	slug: string = "homepage",
	collection: CollectionSlug = "pages",
	locale?: TypedLocale,
) => {
	return unstable_cache(
		async () => {
			const meta: Metadata = {
				icons: {
					icon: [
						{ url: "/favicon.ico" },
						{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
						{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
						{
							url: "/android-chrome-192x192.png",
							sizes: "192x192",
							type: "image/png",
						},
						{
							url: "/android-chrome-512x512.png",
							sizes: "512x512",
							type: "image/png",
						},
					],
					apple: [{ url: "/apple-touch-icon.png" }],
				},
				formatDetection: {
					email: false,
					address: false,
					telephone: false,
				},
			};

			const doc = await getBySlug(slug, collection);

			if (!doc || !("meta" in doc && doc.meta)) return meta;

			const {
				meta: { title, description, image, noIndexing },
			} = doc;

			if (title) {
				meta.title = title;
			}

			if (description) {
				meta.description = description;
			}

			if (typeof image == "object" && image?.url) {
				meta.openGraph = { images: image.url };
			}

			meta.robots = {
				index: !noIndexing,
				follow: true,
				nocache: false,
			};

			return meta;
		},
		[`meta-${collection}-${slug}`, `meta-${collection}-${slug}-${locale}`],
		{
			revalidate: 3600 * 24, // 24 hours
			tags: [
				"all",
				`meta-${collection}-${slug}`,
				`meta-${collection}-${slug}-${locale}`,
			],
		},
	)();
};

export default generateMetaBySlug;
