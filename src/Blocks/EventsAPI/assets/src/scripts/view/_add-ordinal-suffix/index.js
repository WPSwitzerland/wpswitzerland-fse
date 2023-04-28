const addOrdinalSuffix = (day) => {
	if (day === 11 || day === 12 || day === 13) {
		return `${day}th`;
	}
	const lastDigit = day % 10;
	switch (lastDigit) {
		case 1:
			return `${day}st`;
		case 2:
			return `${day}nd`;
		case 3:
			return `${day}rd`;
		default:
			return `${day}th`;
	}
};

export default addOrdinalSuffix;
