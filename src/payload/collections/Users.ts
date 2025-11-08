import type { CollectionConfig } from "payload";

import { publicReadOnly } from "@/access/publicReadOnly";

const Users: CollectionConfig = {
	slug: "users",
	auth: {
		tokenExpiration: process.env.NODE_ENV == "production" ? 7200 : 999999,
	},
	admin: {
		useAsTitle: "email",
	},
	access: publicReadOnly,
	fields: [],
};

export default Users;
