import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get("token");

	const secretKey = process.env.RECAPTCHA_SECRET_KEY;

	try {
		const response = await fetch(
			`https://www.google.com/recaptcha/api/siteverify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${secretKey}&response=${token}`,
			},
		);

		const data = await response.json();

		//console.log(data);

		return Response.json(data, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Failed to fetch events" }, { status: 500 });
	}
}
