"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@components/Button";

import css from "./index.module.css";

const DraftClient = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [visible, setVisible] = useState(true);

	if (!visible) return <></>;

	return (
		<div className={css.block}>
			<Button
				label="Exit Previev"
				onClick={() => {
					fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/exit-preview`)
						.then(() => {
							setVisible(false);
							router.push(pathname);
						})
						.catch(() => {});
				}}
			/>
		</div>
	);
};

export default DraftClient;
