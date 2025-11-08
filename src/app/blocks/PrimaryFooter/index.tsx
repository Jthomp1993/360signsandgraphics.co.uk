import getGlobal from "@actions/getGlobal";

import PrimaryFooterClient from "./index.client";

const PrimaryFooterServer = async () => {
	const props = await getGlobal("sitewideContent");

	return <PrimaryFooterClient {...props} />;
};

export default PrimaryFooterServer;
