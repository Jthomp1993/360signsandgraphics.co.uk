import "@/app/css/global.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

import Draft from "@blocks/Draft";
import PrimaryFooter from "@blocks/PrimaryFooter";
import PrimaryHeader from "@blocks/PrimaryHeader";
import ColorSchemeSwitcher from "@components/ColorSchemeSwitcher";
import CustomCursor from "@components/CustomCursor";
import Fonts from "@components/Fonts";
import InitGSAP from "@components/InitGSAP";
import AppProviders from "@context/AppProviders";

export const fetchCache = "default-cache";

export const metadata = {
	title: "Build The Bandwagon",
	description: "",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<InitGSAP />
			<Fonts />
			{process.env.NEXT_PUBLIC_VERCEL_ENV === "localdevelopment" && (
				<script
					src="https://unpkg.com/react-scan/dist/auto.global.js"
					async
				/>
			)}
			{process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" && (
				<Script
					id="bugherd"
					strategy="afterInteractive"
					src="https://www.bugherd.com/sidebarv2.js?apikey=bhwmowkejgjwzfjxllcijw"
				></Script>
			)}
			{process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
				<GoogleAnalytics gaId="G-BY8M2J1RRQ" />
			)}
			<body>
				<AppProviders>
					<ColorSchemeSwitcher />
					<PrimaryHeader />
					<div id="smooth-wrapper">
						<div id="smooth-content">
							{children}
							<PrimaryFooter />
						</div>
					</div>
				</AppProviders>
				<CustomCursor />
				<Draft />
			</body>
		</html>
	);
}
