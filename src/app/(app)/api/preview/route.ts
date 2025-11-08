import jwt from "jsonwebtoken";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import getPayloadMemo from "@clients/payloadClient";

const payloadToken = "payload-token";

export async function GET(
	req: {
		cookies: {
			get: (name: string) => {
				value: string;
			};
		};
	} & Request,
): Promise<Response> {
	const payload = await getPayloadMemo();
	const token = req.cookies.get(payloadToken)?.value;
	const { searchParams } = new URL(req.url);
	const path = searchParams.get("path");

	const previewSecret = searchParams.get("previewSecret");

	if (previewSecret) {
		return new Response("You are not allowed to preview this page", {
			status: 403,
		});
	} else {
		if (!path) {
			return new Response("No url provided", { status: 404 });
		}

		if (!token) {
			new Response("You are not allowed to preview this page", { status: 403 });
		}

		if (!path.startsWith("/")) {
			new Response("This endpoint can only be used for internal previews", {
				status: 500,
			});
		}

		let user;

		try {
			user = jwt.verify(token, payload.secret);
		} catch (error) {
			payload.logger.error({
				err: error,
				msg: "Error verifying token for live preview",
			});
		}

		const draft = await draftMode();

		// You can add additional checks here to see if the user is allowed to preview this page
		if (!user) {
			draft.disable();
			return new Response("You are not allowed to preview this page", {
				status: 403,
			});
		}

		draft.enable();

		redirect(path);
	}
}
