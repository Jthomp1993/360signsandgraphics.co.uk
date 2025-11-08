"use client";

import { Button, toast } from "@payloadcms/ui";
import { useState } from "react";

const baseClass = "after-dashboard";

const AfterDashboard = () => {
	const [status, setStatus] = useState("");

	const revalidate = async () => {
		setStatus("loading revalidate");

		try {
			const res = await fetch("/api/revalidate?tag=all");
			const json = await res.json();

			if (json.error) {
				setStatus("error");
				toast.error("Something went wrong");
			} else {
				setStatus("success");
				toast.success("Site cache cleared");
			}
		} catch (_error) {
			setStatus("error");
			toast.error("Failed to revalidate");
		}
	};

	const redeploy = async () => {
		setStatus("loading redeploy");

		try {
			const res = await fetch("/api/redeploy");
			const json = await res.json();

			if (json.error) {
				setStatus("error");
				toast.error("Something went wrong");
			} else {
				setStatus("success");
				toast.success(
					"Request has been sent. Deployment will take 4-6 minutes",
				);
			}
		} catch (_error) {
			setStatus("error");
			toast.error("Failed to redeploy");
		}
	};

	return (
		<div className={baseClass}>
			<hr style={{ marginBottom: 35 }} />
			<h2>Update site</h2>
			<p>
				For simple content changes, press &quot;Clear cache&quot; to apply the
				changes to the website. If you have made larger changes, such as adding
				or removing pages, you may need to redeploy the entire site. This can
				take 3-4 minutes to complete. The site will remain live, but changes
				will not be applied until the process has completed.
			</p>
			<div
				style={{
					display: "flex",
					gap: "15px",
				}}
			>
				<Button onClick={revalidate}>
					{status == "loading revalidate" ? "Loading..." : "Clear cache"}
				</Button>
				<Button onClick={redeploy}>
					{status == "loading redeploy" ? "Loading..." : "Redeploy"}
				</Button>
			</div>
		</div>
	);
};

export default AfterDashboard;
