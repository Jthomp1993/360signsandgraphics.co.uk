import type {
	CollectionSlug,
	PopulateType,
	SelectType,
	Sort,
	TypedLocale,
	Where,
} from "payload";

import getPayloadMemo from "@clients/payloadClient";

const getByCollection = async (
	collection: CollectionSlug,
	options: {
		depth?: number;
		limit?: number;
		sort?: Sort;
		where?: Where;
		select?: SelectType;
		populate?: PopulateType;
		locale?: "all" | TypedLocale;
	} = {
		depth: 0,
		limit: 999,
		sort: "title",
		where: {},
		select: undefined,
		populate: undefined,
		locale: undefined,
	},
) => {
	const { limit, sort, where, depth, select, populate } = options;

	const payload = await getPayloadMemo();

	const pages = await payload.find({
		collection: collection,
		limit: limit,
		sort: sort,
		where: where,
		depth: depth,
		select: select,
		populate: populate,
	});

	return pages;
};

export default getByCollection;
