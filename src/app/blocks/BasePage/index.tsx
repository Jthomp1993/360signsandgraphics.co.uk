"use client";

import type { BasePageTemplate } from "@/payload-types";

import parse from "html-react-parser";

import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const BasePage: React.FC<BasePageTemplate & { title: string }> = ({
	title,
	content_html,
}) => {
	return (
		<section className={css.block}>
			<Wrapper className={css.wrapper}>
				<h1 className={css.title}>{title}</h1>
				{content_html && (
					<div className={css.content}>{parse(content_html)}</div>
				)}
			</Wrapper>
		</section>
	);
};

export default BasePage;
