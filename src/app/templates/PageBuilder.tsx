import type { Page } from "@/payload-types";
import type { ReactElement } from "react";

import dynamic from "next/dynamic";

const HeroHomepage = dynamic(() => import("@blocks/HeroHomepage"), {
	loading: () => <div>Loading...</div>,
});
const StatementText = dynamic(() => import("@blocks/StatementText"), {
	loading: () => <div>Loading...</div>,
});
const FloatingTeam = dynamic(() => import("@blocks/FloatingTeam"), {
	loading: () => <div>Loading...</div>,
});
const Brands = dynamic(() => import("@blocks/Brands"), {
	loading: () => <div>Loading...</div>,
});
const Stories = dynamic(() => import("@blocks/Stories"), {
	loading: () => <div>Loading...</div>,
});
const TitleWithImage = dynamic(() => import("@blocks/TitleWithImage"), {
	loading: () => <div>Loading...</div>,
});
const TextWithImage = dynamic(() => import("@blocks/TextWithImage"), {
	loading: () => <div>Loading...</div>,
});
const Reviews = dynamic(() => import("@blocks/Reviews"), {
	loading: () => <div>Loading...</div>,
});
const HeroCarousel = dynamic(() => import("@blocks/HeroCarousel"), {
	loading: () => <div>Loading...</div>,
});
const OurPillars = dynamic(() => import("@blocks/OurPillars"), {
	loading: () => <div>Loading...</div>,
});
const HeroWithImage = dynamic(() => import("@blocks/HeroWithImage"), {
	loading: () => <div>Loading...</div>,
});
const TextBlock = dynamic(() => import("@blocks/TextBlock"), {
	loading: () => <div>Loading...</div>,
});
const TitleBlock = dynamic(() => import("@blocks/TitleBlock"), {
	loading: () => <div>Loading...</div>,
});
const Testimonial = dynamic(() => import("@blocks/Testimonial"), {
	loading: () => <div>Loading...</div>,
});
const OtherPillars = dynamic(() => import("@blocks/OtherPillars"), {
	loading: () => <div>Loading...</div>,
});
const Hero2 = dynamic(() => import("@blocks/Hero2"), {
	loading: () => <div>Loading...</div>,
});
const FloatingNumbers = dynamic(() => import("@blocks/FloatingNumbers"), {
	loading: () => <div>Loading...</div>,
});
const OurPeople = dynamic(() => import("@blocks/OurPeople"), {
	loading: () => <div>Loading...</div>,
});
const FloatingTeam2 = dynamic(() => import("@blocks/FloatingTeam2"), {
	loading: () => <div>Loading...</div>,
});
const OurValues = dynamic(() => import("@blocks/OurValues"), {
	loading: () => <div>Loading...</div>,
});
const VideoScrub = dynamic(() => import("@blocks/VideoScrub"), {
	loading: () => <div>Loading...</div>,
});
const CreativeTestimonial = dynamic(
	() => import("@blocks/CreativeTestimonial"),
	{
		loading: () => <div>Loading...</div>,
	},
);
const CardsCarousel = dynamic(() => import("@blocks/CardsCarousel"), {
	loading: () => <div>Loading...</div>,
});
const TextReveal = dynamic(() => import("@blocks/TextReveal"), {
	loading: () => <div>Loading...</div>,
});

type PageBuilderBlock = (
	block: NonNullable<Page["layout"]>[0],
	idx: number,
) => ReactElement;

export const PageBuilderBlock: PageBuilderBlock = (block, idx) => {
	if (!block.blockType) return <></>;

	switch (block.blockType) {
		case "hero-homepage":
			return (
				<HeroHomepage
					key={idx}
					{...block}
				/>
			);
		case "hero-carousel":
			return (
				<HeroCarousel
					key={idx}
					{...block}
				/>
			);
		case "statement-text":
			return (
				<StatementText
					key={idx}
					{...block}
				/>
			);
		case "floating-team":
			return (
				<FloatingTeam
					key={idx}
					{...block}
				/>
			);
		case "brands":
			return (
				<Brands
					key={idx}
					{...block}
				/>
			);
		case "stories":
			return (
				<Stories
					key={idx}
					{...block}
				/>
			);
		case "title-with-image":
			return (
				<TitleWithImage
					key={idx}
					{...block}
				/>
			);
		case "text-with-image":
			return (
				<TextWithImage
					key={idx}
					{...block}
				/>
			);
		case "reviews":
			return (
				<Reviews
					key={idx}
					{...block}
				/>
			);
		case "our-pillars":
			return (
				<OurPillars
					key={idx}
					{...block}
				/>
			);
		case "hero-with-image":
			return (
				<HeroWithImage
					key={idx}
					{...block}
				/>
			);
		case "text-block":
			return (
				<TextBlock
					key={idx}
					{...block}
				/>
			);
		case "title-block":
			return (
				<TitleBlock
					key={idx}
					{...block}
				/>
			);
		case "testimonial":
			return (
				<Testimonial
					key={idx}
					{...block}
				/>
			);
		case "other-pillars":
			return (
				<OtherPillars
					key={idx}
					{...block}
				/>
			);
		case "hero2":
			return (
				<Hero2
					key={idx}
					{...block}
				/>
			);
		case "floating-numbers":
			return (
				<FloatingNumbers
					key={idx}
					{...block}
				/>
			);
		case "our-people":
			return (
				<OurPeople
					key={idx}
					{...block}
				/>
			);
		case "floating-team2":
			return (
				<FloatingTeam2
					key={idx}
					{...block}
				/>
			);
		case "our-values":
			return (
				<OurValues
					key={idx}
					{...block}
				/>
			);
		case "video-scrub":
			return (
				<VideoScrub
					key={idx}
					{...block}
				/>
			);
		case "creative-testimonial":
			return (
				<CreativeTestimonial
					key={idx}
					{...block}
				/>
			);
		case "cards-carousel":
			return (
				<CardsCarousel
					key={idx}
					{...block}
				/>
			);
		case "text-reveal":
			return (
				<TextReveal
					key={idx}
					{...block}
				/>
			);
		default:
			return <></>;
	}
};

const PageBuilder = ({ layout }: Pick<Page, "layout">) => {
	if (!layout || layout.length === 0) return null;

	return (
		<>
			{/* <AnchorNav layout={layout} /> */}
			{layout.map((block, idx) => PageBuilderBlock(block, idx))}
		</>
	);
};

export default PageBuilder;
