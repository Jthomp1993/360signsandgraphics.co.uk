"use client";

import Button from "@components/Button";
import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const Page404: React.FC = () => {
	return (
		<section className={css.block}>
			<Wrapper>
				<h2 className={css.subTitle}>404 ERROR</h2>
				<h1 className={css.title}>We Lost this page</h1>
				<p className={css.copy}>
					We&apos;ve searched high and low, but can&apos;t find what you&apos;re
					looking for (don&apos;t worry we won&apos;t blame you) Let&apos;s just
					get you back to a nice warm place shall we?
				</p>
				<Button
					url="/"
					label="Head back home"
					className={css.button}
				/>
			</Wrapper>
		</section>
	);
};

export default Page404;
