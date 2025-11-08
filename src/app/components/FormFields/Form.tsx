"use client";

import { render } from "@react-email/render";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Email from "@emailTemplates/base";
import useRecaptcha from "@hooks/useRecaptcha";
import readFile, { readFile as readFileType } from "@util/readFile";

import css from "./index.module.css";

type Form = {
	to: string;
	className?: string;
	children: any;
	onSent?: Dispatch<SetStateAction<boolean | null>> | null;
	formTitle: string;
};

export default function Form({
	to,
	className = "",
	children,
	formTitle,
	onSent,
}: Form) {
	const blockCSS = [css.block];
	const methods = useForm();
	const recaptchaToken = useRecaptcha();
	const [validated, setValidated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!recaptchaToken) return;

		fetch("/api/verify-recaptha?token=" + recaptchaToken)
			.then((data) => data.json())
			.then((data) => {
				setValidated(data.success as boolean);
			});
	}, [recaptchaToken]);

	if (blockCSS) {
		blockCSS.push(className);
	}

	const sendMail = async (data: any, files?: any) => {
		if (!validated) {
			console.log("recaptcha failed");

			return;
		}

		const emailHtml = await render(
			<Email
				title={formTitle}
				fields={data}
			/>,
			{
				pretty: true,
			},
		);

		const bodyData = {
			to: to,
			subject: formTitle,
			attachments: files,
			html: emailHtml,
		};

		gsap.set(document.body, {
			cursor: "wait",
		});

		fetch("/api/mail", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
		})
			.then((data) => data.json())
			.then((body) => {
				console.log("Response received");
				console.log(body);

				gsap.set(document.body, {
					cursor: "default",
				});

				router.push("/thank-you");

				onSent && onSent(body.status !== "error");
			})
			.catch((err) => {
				console.log("Something went wrong");
				console.log(err);
			});
	};

	const onSubmit = (data: any) => {
		const attachments: readFileType[] = [];

		Object.keys(data).forEach((val) => {
			if (
				typeof data[val][0] === "undefined" ||
				typeof data[val][0].name === "undefined"
			)
				return;

			attachments.push(readFile(data[val][0]));
		});

		if (attachments.length) {
			Promise.all(attachments).then((files) => {
				sendMail(data, files);
			});
		} else {
			sendMail(data);
		}
	};

	return (
		<FormProvider {...methods}>
			<form
				className={blockCSS.join(" ")}
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				{children}
			</form>
		</FormProvider>
	);
}
