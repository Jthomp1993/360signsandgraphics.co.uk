import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

const getPayloadMemo = cache(async () => {
	console.log("Payload Client", performance.now());

	const client = await getPayload({
		config: configPromise,
	});

	return client;
});

export default getPayloadMemo;
