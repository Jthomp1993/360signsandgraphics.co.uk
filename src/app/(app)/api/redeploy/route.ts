export async function POST() {
	fetch(process.env.VERCEL_DEPLOY_HOOK as string)
		.then(() => {
			return Response.json(
				{ status: "success", message: "Redeploy started" },
				{ status: 200 },
			);
		})
		.catch((_err) => {
			return Response.json({ status: "error" }, { status: 400 });
		});
}
