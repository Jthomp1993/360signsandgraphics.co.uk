import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "buildthebandwagon.s3.eu-west-1.amazonaws.com",
				pathname: "/**",
			},
		],
	},
	experimental: {
		reactCompiler: true,
	},
};

export default withPayload(nextConfig);
