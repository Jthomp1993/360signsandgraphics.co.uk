"use client";

import useSwiperReactive from "@hooks/useSwiperReactive";

import css from "./index.module.css";

type SwiperArrows = {
	className?: string;
	style?: "filled" | "bordered";
	slot?: "container-start" | "container-end" | "wrapper-start" | "wrapper-end";
};

const SwiperArrows: React.FC<SwiperArrows> = ({ className, style, slot }) => {
	const swiper = useSwiperReactive();
	const blockCSS = [css.SwiperArrows];

	if (className) {
		blockCSS.push(className);
	}

	if (style) {
		blockCSS.push(css[style]);
	}

	return (
		<div
			className={blockCSS.join(" ")}
			slot={slot}
		>
			<button
				className={`b-reset`}
				onClick={() => swiper.slidePrev()}
				aria-disabled={!swiper.allowSlidePrev}
			>
				<svg
					width="11"
					height="12"
					viewBox="0 0 11 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M1.89359 6.31177L6.28668 10.7049L5.84474 11.1468L0.918106 6.22017L0.697136 5.9992L0.918106 5.77823L5.84376 0.852577L6.2857 1.29452L1.89344 5.68677L10.9914 5.68768L10.9913 6.31268L1.89359 6.31177Z"
						fill="currentColor"
					/>
				</svg>
			</button>
			<button
				className={`b-reset`}
				onClick={() => swiper.slideNext()}
				aria-disabled={!swiper.allowSlideNext}
			>
				<svg
					width="11"
					height="12"
					viewBox="0 0 11 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M9.1064 5.68823L4.71332 1.29514L5.15526 0.853195L10.0819 5.77983L10.3029 6.0008L10.0819 6.22177L5.15624 11.1474L4.7143 10.7055L9.10656 6.31323L0.00860382 6.31232L0.00866639 5.68732L9.1064 5.68823Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</div>
	);
};

export default SwiperArrows;
