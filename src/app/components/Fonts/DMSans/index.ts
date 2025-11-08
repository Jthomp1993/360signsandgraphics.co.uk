import localFont from "next/font/local";

const DMSans = localFont({
	src: [
		{
			path: "./DMSans-Light.woff2",
			style: "normal",
			weight: "300"
		},
		{
			path: "./DMSans-LightItalic.woff2", 
			style: "italic",
			weight: "300"
		},
		{
			path: "./DMSans-Regular.woff2",
			style: "normal", 
			weight: "400"
		},
		{
			path: "./DMSans-Italic.woff2",
			style: "italic",
			weight: "400"
		},
		{
			path: "./DMSans-Medium.woff2",
			style: "normal",
			weight: "500"
		},
		{
			path: "./DMSans-MediumItalic.woff2",
			style: "italic", 
			weight: "500"
		},
		{
			path: "./DMSans-Bold.woff2",
			style: "normal",
			weight: "700"
		},
		{
			path: "./DMSans-BoldItalic.woff2",
			style: "italic",
			weight: "700"
		}
	],
	display: "swap",
});

export default DMSans;
