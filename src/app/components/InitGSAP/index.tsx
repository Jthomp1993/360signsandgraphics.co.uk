"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/dist/MorphSVGPlugin";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";

gsap.registerPlugin(
	useGSAP,
	ScrollTrigger,
	ScrollSmoother,
	SplitText,
	ScrollToPlugin,
	MorphSVGPlugin,
);

function InitGSAP() {
	/* useGSAP(() => {
		gsap.registerPlugin(
			useGSAP,
			ScrollTrigger,
			ScrollSmoother,
			SplitText,
			ScrollToPlugin,
			MorphSVGPlugin,
		);
	}, []); */

	useGSAP(() => {
		ScrollTrigger.defaults({
			invalidateOnRefresh: true,
		});
	}, []);

	return <></>;
}

export default InitGSAP;
