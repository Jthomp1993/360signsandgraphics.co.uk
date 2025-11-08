"use client";

import { useTransitionState } from "next-transition-router";
import { usePathname } from "next/navigation";
import {
	createContext,
	use,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export type GlobalContextType = {
	animationDelay: number | null;
	isReady: boolean;
	stage: "leaving" | "entering" | "none";
	navButton: boolean | null;
	setNavButton: (callback: boolean | null) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
	animationDelay: 0,
	isReady: false,
	stage: "none",
	navButton: null,
	setNavButton: () => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const [animationDelay, setAnimationDelay] = useState<number | null>(null);
	const [navButton, setNavButton] = useState<boolean | null>(null);
	const isFirstLoad = useRef(true);
	const { isReady, stage } = useTransitionState();
	const pathname = usePathname();

	useEffect(() => {
		if (isFirstLoad.current) {
			setAnimationDelay(4.5);
			isFirstLoad.current = false;

			return;
		}

		setAnimationDelay(0.4);
	}, [pathname]);

	// Memoize the context value to prevent unnecessary re-renders
	const contextValue = useMemo(
		() => ({
			animationDelay,
			isReady,
			stage,
			navButton,
			setNavButton,
		}),
		[animationDelay, isReady, stage, navButton],
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	return use(GlobalContext);
};

export default GlobalProvider;
