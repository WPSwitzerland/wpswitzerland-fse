export const timeArray = (props) => {
	const { date_from, date_to, language } = props;

	const formattedFromTime = date_from.toLocaleTimeString(language, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: false,
	});

	const formattedToTime = date_to.toLocaleTimeString(language, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: false,
	});

	return {
		from: formattedFromTime,
		to: formattedToTime,
	};
};

export default timeArray;
