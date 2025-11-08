import type { Field } from "payload";

import { fields as ContactUsFields } from "@blocks/ContactUs/schema";

const ContactUsTemplate = (): Field => ({
	name: "contactUsTemplate",
	type: "group",
	localized: true,
	label: false,
	interfaceName: "ContactUsTemplate",
	fields: ContactUsFields,
	admin: {
		condition: (_, siblingData) => {
			return siblingData.template == "contact-us";
		},
	},
});

export default ContactUsTemplate;
