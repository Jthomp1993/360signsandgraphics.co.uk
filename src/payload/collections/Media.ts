import type { CollectionConfig } from "payload";

import { publicReadOnly } from "@/access/publicReadOnly";

import { altField } from "@payload/fields/alt";

const Media: CollectionConfig = {
	slug: "media",
	access: publicReadOnly,
	fields: [altField()],
};

export default Media;
