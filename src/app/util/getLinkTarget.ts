export type getLinkTarget = {
	newTab?: boolean | null;
};

const getLinkTarget = ({ newTab }: getLinkTarget): string =>
	newTab ? "_blank" : "_self";

export default getLinkTarget;
