"use client";

import { useEffect, useState } from "react";

type mediaQueryString =
	| string
	| "xsUp"
	| "smUp"
	| "mdUp"
	| "lgUp"
	| "xlUp"
	| "xxlUp"
	| "xxxlUp"
	| "xsDown"
	| "smDown"
	| "mdDown"
	| "lgDown"
	| "xlDown"
	| "xxlDown"
	| "xxxlDown";

export default function useMediaQuery(mediaQueryString: mediaQueryString) {
	const [matches, setMatches] = useState<boolean>();
	let mediaQuery = "";

	switch (mediaQueryString) {
		case "xsUp":
			mediaQuery = "(min-width: 480px)";
			break;
		case "smUp":
			mediaQuery = "(min-width: 768px)";
			break;
		case "mdUp":
			mediaQuery = "(min-width: 960px)";
			break;
		case "lgUp":
			mediaQuery = "(min-width: 1024px)";
			break;
		case "xlUp":
			mediaQuery = "(min-width: 1230px)";
			break;
		case "xxlUp":
			mediaQuery = "(min-width: 1450px)";
			break;
		case "xxxlUp":
			mediaQuery = "(min-width: 1600px)";
			break;
		case "xsDown":
			mediaQuery = "(max-width: 479px)";
			break;
		case "smDown":
			mediaQuery = "(max-width: 767px)";
			break;
		case "mdDown":
			mediaQuery = "(max-width: 959px)";
			break;
		case "lgDown":
			mediaQuery = "(max-width: 1023px)";
			break;
		case "xlDown":
			mediaQuery = "(max-width: 1229px)";
			break;
		case "xxlDown":
			mediaQuery = "(max-width: 1449px)";
			break;
		case "xxxlDown":
			mediaQuery = "(max-width: 1599px)";
			break;

		default:
			mediaQuery = mediaQueryString;
			break;
	}

	useEffect(() => {
		const mediaQueryList = window.matchMedia(mediaQuery);
		const listener = () => setMatches(!!mediaQueryList.matches);
		listener();
		mediaQueryList.addEventListener("change", listener);
		return () => mediaQueryList.removeEventListener("change", listener);
	}, [mediaQuery]);

	return matches;
}
