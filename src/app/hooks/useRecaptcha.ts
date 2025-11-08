import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const useRecaptcha = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [token, setToken] = useState<string | null>(null);

	const getRecaptchaToken = useCallback(async () => {
		if (!executeRecaptcha) {
			//console.error("Execute recaptcha is not yet available");
			return;
		}

		const recaptchaToken = await executeRecaptcha("formValidation");
		setToken(recaptchaToken);
	}, [executeRecaptcha]);

	useEffect(() => {
		getRecaptchaToken();
	}, [getRecaptchaToken]);

	return token;
};

export default useRecaptcha;
