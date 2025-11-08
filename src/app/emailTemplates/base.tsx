import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Row,
	Section,
	Text,
} from "@react-email/components";
import { Fragment } from "react";

import toBr from "@util/toBr";

export default function Email({ title, fields }: any) {
	const titleCase = (s: string) =>
		s
			.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
			.replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
	const keys = Object.keys(fields);

	return (
		<Html>
			<Head />
			<Body style={main}>
				<Section style={main}>
					<Container style={container}>
						<Row>
							<Text style={heading}>{title}</Text>
							{keys.map((key, idx) => {
								if (
									typeof fields[key][0] !== "undefined" &&
									typeof fields[key][0].name !== "undefined"
								)
									return <></>;

								let value = "";

								if (typeof fields[key] === "object" && fields[key].length) {
									value = fields[key].join(", ");
								} else if (typeof fields[key] !== "object") {
									value = fields[key];
								}

								return (
									<Fragment key={idx}>
										<Text style={{ ...paragraph, fontWeight: "700" }}>
											{titleCase(key)}
										</Text>
										<Text style={paragraph}>{toBr(value) || "-"}</Text>
										{keys.length != idx + 1 && <Hr style={hr} />}
									</Fragment>
								);
							})}
						</Row>
					</Container>
				</Section>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	width: "580px",
};

const heading = {
	fontSize: "32px",
	lineHeight: "1.3",
	fontWeight: "700",
	color: "#484848",
	marginBottom: "30px",
};

const paragraph = {
	fontSize: "18px",
	lineHeight: "1.4",
	color: "#484848",
};

const hr = {
	borderColor: "#cccccc",
	margin: "20px 0",
};
