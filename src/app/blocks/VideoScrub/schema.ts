import type { Block, Field } from "payload";
import blockName from "@payload/fields/blockName";

const fields: Field[] = [
	blockName(),
];

const VideoScrub: Block = {
	slug: "video-scrub",
	interfaceName: "VideoScrub",
	imageURL: '/payload-imgs/VideoScrub.png',
	fields: fields,
};

export default VideoScrub;
