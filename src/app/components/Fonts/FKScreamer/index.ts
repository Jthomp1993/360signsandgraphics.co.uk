import localFont from "next/font/local";

const FKScreamer = localFont({
	src: [
		{
			path: "./FKScreamer-Bold.woff2",
			style: "normal",
			weight: "700",
		},
		{
			path: "./FKScreamer-Black.woff2",
			style: "normal",
			weight: "900",
		},
	],
	display: "swap",
	preload: true,
	// fallback: ["Arial", "sans-serif"],
	// adjustFontFallback: "Arial",
});

export default FKScreamer;
