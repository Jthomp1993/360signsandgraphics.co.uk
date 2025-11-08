import { Media } from "@/payload-types";

const isImage = (obj: Media | string): boolean => {
	return !!obj && typeof obj === "object" && !!obj.url;
};

export default isImage;
