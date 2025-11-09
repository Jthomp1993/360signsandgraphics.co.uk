import type { BlocksField } from "payload";

import Brands from "@blocks/Brands/schema";
import CardsCarousel from "@blocks/CardsCarousel/schema";
import CreativeTestimonial from "@blocks/CreativeTestimonial/schema";
import FloatingNumbers from "@blocks/FloatingNumbers/schema";
import FloatingTeam2 from "@blocks/FloatingTeam2/schema";
import FloatingTeam from "@blocks/FloatingTeam/schema";
import Hero2 from "@blocks/Hero2/schema";
import HeroHome from "@blocks/HeroHome/schema";
import HeroCarousel from "@blocks/HeroCarousel/schema";
import HeroHomepage from "@blocks/HeroHomepage/schema";
import HeroWithImage from "@blocks/HeroWithImage/schema";
import OtherPillars from "@blocks/OtherPillars/schema";
import OurPeople from "@blocks/OurPeople/schema";
import OurPillars from "@blocks/OurPillars/schema";
import OurValues from "@blocks/OurValues/schema";
import Reviews from "@blocks/Reviews/schema";
import StatementText from "@blocks/StatementText/schema";
import Stories from "@blocks/Stories/schema";
import Testimonial from "@blocks/Testimonial/schema";
import TextBlock from "@blocks/TextBlock/schema";
import TextReveal from "@blocks/TextReveal/schema";
import TextWithImage from "@blocks/TextWithImage/schema";
import TitleBlock from "@blocks/TitleBlock/schema";
import TitleWithImage from "@blocks/TitleWithImage/schema";
import VideoScrub from "@blocks/VideoScrub/schema";

const PageBuilderTemplate = (): BlocksField => ({
	name: "layout",
	type: "blocks",
	localized: true,
	blocks: [
		Brands,
		CardsCarousel,
		CreativeTestimonial,
		FloatingNumbers,
		FloatingTeam,
		FloatingTeam2,
		Hero2,
		HeroHome,
		HeroCarousel,
		HeroHomepage,
		HeroWithImage,
		OtherPillars,
		OurPeople,
		OurPillars,
		OurValues,
		Reviews,
		StatementText,
		Stories,
		Testimonial,
		TextBlock,
		TextReveal,
		TextWithImage,
		TitleBlock,
		TitleWithImage,
		VideoScrub,
	],
	admin: {
		condition: (_data, siblingData) => {
			return ["page-builder", "what-we-do-subpage"].includes(
				siblingData.template,
			);
		},
	},
});

export default PageBuilderTemplate;
