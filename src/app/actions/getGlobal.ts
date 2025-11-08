import type { GlobalSlug } from "payload";

import { unstable_cache } from "next/cache";

import getPayloadMemo from "@clients/payloadClient";

const getGlobal = async (globalSlug: GlobalSlug, locale = "en") => {
	return unstable_cache(
		async () => {
			const payload = await getPayloadMemo();

			console.log(`fetch global ${globalSlug} ${performance.now()}`);

			const doc = await payload.findGlobal({
				slug: globalSlug,
				//locale: locale,
			});

			return doc;
		},
		[`global-${globalSlug}`, `global-${globalSlug}-${locale}`],
		{
			revalidate: 3600 * 24, // 24 hours
			tags: ["all", `global-${globalSlug}`, `global-${globalSlug}-${locale}`],
		},
	)();
};

export default getGlobal;
