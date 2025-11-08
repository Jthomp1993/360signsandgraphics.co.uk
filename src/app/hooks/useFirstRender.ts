"use client";

import { useEffect, useState } from "react";

/**
 * A hook that returns true only during the first render of a component.
 * Useful for performing actions only on the initial render.
 * 
 * @returns {boolean} - True on first render, false afterward
 */
export function useFirstRender() {
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		// This effect runs after the first render
		// and sets isFirstRender to false
		setIsFirstRender(false);
	}, []);

	return isFirstRender;
}

export default useFirstRender;
