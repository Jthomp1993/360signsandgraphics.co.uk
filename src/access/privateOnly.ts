import type { CollectionConfig } from "payload";

import { isLoggedIn } from "./isLoggedIn";

export const privateOnly: CollectionConfig["access"] = {
	read: isLoggedIn,
	create: isLoggedIn,
	update: isLoggedIn,
	delete: isLoggedIn,
};
