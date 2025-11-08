const debounce = (fn: Function, ms = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export const debounceRAF = (func: Function) => {
	let requestId: number | null = null;

	return function (this: any, ...args: any[]) {
		if (requestId) {
			cancelAnimationFrame(requestId);
		}

		requestId = requestAnimationFrame(() => {
			func.apply(this, args);
		});
	};
};

export default debounce;
