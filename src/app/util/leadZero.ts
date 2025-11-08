export default function leadZero(num: number, size: number = 2) {
	let numString = num.toString();
	
	while (numString.length < size) numString = "0" + num;

	return numString;
}
