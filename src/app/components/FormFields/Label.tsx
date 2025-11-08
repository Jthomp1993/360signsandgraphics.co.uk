import css from "./index.module.css";

type Label = {
	label: string;
	subLabel?: string;
	className?: string;
};

export default function Label({ label, subLabel = "", className = "" }: Label) {
	const blockCSS = [css.label];

	if (className) {
		blockCSS.push(className);
	}

	return (
		<h6 className={`${blockCSS.join(" ")}`}>
			<span className="g-h7">{label}</span>
			{subLabel && <span className="g-text">{subLabel}</span>}
		</h6>
	);
}
