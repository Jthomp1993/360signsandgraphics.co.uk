import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
	HTMLConverterFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";

import path from "path";
import { fileURLToPath } from "url";

import Media from "@payload/collections/Media";
import Pages from "@payload/collections/Pages";
import Users from "@payload/collections/Users";
import { StylizedParagraphFeature } from "@payload/features/paragraphFeature/server";
import SitewideContent from "@payload/globals/sitewideContent";
import { LinkHTMLConverter } from "@payload/lexical/LinkHTMLConverter";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export type SEOCollections = "pages";

export default buildConfig({
	db: mongooseAdapter({
		url: process.env.MONGODB_URI as string,
	}),
	admin: {
		components: {
			afterDashboard: ["@payload/components/AfterDashboard"],
		},
	},
	routes: {
		admin: "/bb-login",
	},
	collections: [Media, Pages, Users],
	globals: [SitewideContent],
	plugins: [
		s3Storage({
			collections: {
				media: {
					generateFileURL: (file) => {
						return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${file.filename}`;
					},
				},
			},
			config: {
				endpoint: process.env.S3_ENDPOINT,
				region: process.env.S3_REGION,
				forcePathStyle: true,
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
				},
			},
			disableLocalStorage: true,
			bucket: process.env.S3_BUCKET as string,
		}),
		seoPlugin({
			collections: ["pages"],
			fields: ({ defaultFields }) => [
				...defaultFields,
				/* {
					name: "canonicalUrl",
					type: "text",
					localized: true,
				}, */
				{
					name: "noIndexing",
					type: "checkbox",
					defaultValue: false,
					localized: true,
				},
			],
			uploadsCollection: "media",
		}),
	],
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			HTMLConverterFeature({
				converters: ({ defaultConverters }) => [
					...defaultConverters,
					LinkHTMLConverter,
				],
			}),
			StylizedParagraphFeature(),
		],
	}),
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	upload: {
		limits: {
			fileSize: 50 * 1000000, // 50MB, written in bytes
		},
	},
	secret: process.env.PAYLOAD_SECRET || "",
});
