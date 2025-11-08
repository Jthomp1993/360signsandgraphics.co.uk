import { unstable_cache } from "next/cache";
import { CollectionSlug } from "payload";

import getPayloadMemo from "@clients/payloadClient";

const getById = async (
	id: string,
	collection: CollectionSlug = "pages",
	depth = 1,
) => {
	return unstable_cache(
		async () => {
			const payload = await getPayloadMemo();

			console.log(`fetch by id ${id} ${performance.now()}`);

			const doc = await payload.findByID({
				collection: collection,
				id: id,
				depth: depth,
			});

			return doc;
		},
		[`${collection}-${id}`],
		{
			revalidate: 3600 * 24, // 24 hours
			tags: ["all", `${collection}-${id}`],
		},
	)();
};

export default getById;
