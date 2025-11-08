import type { Page } from "@/payload-types";
import type { Metadata } from "next";
import type { PaginatedDocs, TypedLocale } from "payload";

import PageBuilder from "@templates/PageBuilder";
import { notFound } from "next/navigation";

import generateMetaBySlug from "@actions/generateMetaBySlug";
import getByCollection from "@actions/getByCollection";
import getBySlug from "@actions/getBySlug";
import BasePage from "@blocks/BasePage";
import ContactUs from "@blocks/ContactUs";
import Layout from "@components/Layout";

export const dynamic = "force-static";

export type Props = { params: Promise<{ slug: string; locale: TypedLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	return await generateMetaBySlug(slug, "pages");
}

export async function generateStaticParams() {
	const docs = (await getByCollection("pages", {
		depth: 0,
		limit: 99999,
		select: {
			slug: true,
		},
		where: {
			_status: { equals: "published" },
		},
	})) as PaginatedDocs<Page>;

	const filteredSlugs = docs.docs.filter(
		(doc) => doc.slug && !["homepage"].includes(doc.slug),
	);

	return filteredSlugs.map(({ slug }) => ({
		slug: slug,
	}));
}

export default async function Page({ params }: Props) {
	const { slug = "homepage" } = await params;

	const doc = await getBySlug(slug, "pages");

	if (!doc) {
		notFound();
	}

	if ("template" in doc) {
		const { title, template, layout, basePageTemplate, contactUsTemplate } =
			doc;

		return (
			<Layout
				template={template}
				accentColor={
					doc.template == "what-we-do-subpage" ? doc.accentColor : undefined
				}
			>
				{!!template &&
					["page-builder", "what-we-do-subpage"].includes(template) && (
						<PageBuilder layout={layout} />
					)}
				{template == "base-page" && basePageTemplate && (
					<BasePage
						title={title}
						{...basePageTemplate}
					/>
				)}
				{template == "contact-us" && contactUsTemplate && (
					<ContactUs {...contactUsTemplate} />
				)}
			</Layout>
		);
	}

	return <>Page is empty</>;
}
