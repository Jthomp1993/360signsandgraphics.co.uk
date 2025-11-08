import { draftMode } from "next/headers";

import DraftClient from "./index.client";

const Draft = async () => {
	const { isEnabled } = await draftMode();

	if (!isEnabled) return <></>;

	return <DraftClient />;
};

export default Draft;
