import localFont from "next/font/local";

const Satoshi = localFont({
	src: [
		
		{
			path: "./Satoshi-Variable.woff2",
			style: "normal", 
			weight: "400"
		},
	],
	display: "swap",
});

export default Satoshi;