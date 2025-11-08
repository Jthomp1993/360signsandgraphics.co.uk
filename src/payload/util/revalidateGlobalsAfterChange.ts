import { GlobalAfterChangeHook } from "payload";

const revalidateGlobalsAfterChange: GlobalAfterChangeHook = async ({
	global,
}) => {
	await fetch(
		`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?tag=${global.slug}`,
	);
};

export default revalidateGlobalsAfterChange;
