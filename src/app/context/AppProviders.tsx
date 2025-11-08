"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import PreloaderRouter from "@context/PreloaderRouter";

import GlobalProvider from "./GlobalProvider";
import ScrollSmootherProvider from "./ScrollSmootherProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ScrollSmootherProvider>
			<PreloaderRouter>
				<GlobalProvider>
					<GoogleReCaptchaProvider
						reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
						scriptProps={{
							async: true,
							defer: true,
							appendTo: "head",
						}}
					>
						{children}
					</GoogleReCaptchaProvider>
				</GlobalProvider>
			</PreloaderRouter>
		</ScrollSmootherProvider>
	);
};

export default AppProviders;
