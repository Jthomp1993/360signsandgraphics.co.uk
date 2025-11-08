import getGlobal from "@actions/getGlobal";

import PrimaryHeaderClient from "./index.client";

const PrimaryHeader = async () => {
	const { header } = await getGlobal("sitewideContent");

	return <PrimaryHeaderClient {...header} />;
};

export default PrimaryHeader;
