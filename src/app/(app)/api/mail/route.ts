import sendgrid from "@sendgrid/mail";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);
	const { to, subject, html, attachments } = await req.json();

	const options = {
		from: process.env.SENDGRID_FROM || "noreply@showandtell.agency",
		to: to.split(","),
		subject,
		html,
		attachments,
	};

	try {
		await sendgrid.send(options);

		return Response.json(
			{ message: "Email sent successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Email sent error" }, { status: 500 });
	}
}
