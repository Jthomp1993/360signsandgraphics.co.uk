"use client";

import type { HeroHome as HeroHomeType } from "@/payload-types";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";

import Button from "@components/Button";
import Wrapper from "@components/Wrapper";

import css from "./index.module.css";

const HeroHome: React.FC<HeroHomeType> = ({
	image,
	label,
    heading,
    description,
	link,
}) => {
	const ref = useRef<HTMLElement>(null);

	return (
		<section
			ref={ref}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				Hero home
			</Wrapper>
		</section>
	);
};

export default HeroHome;
