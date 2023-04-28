export const timeArray = (props) => {
	const { date_from, date_to, language } = props;

	const formattedFromTime = date_from.toLocaleTimeString(language, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		hourCycle: 'h12',
	});

	const formattedToTime = date_to.toLocaleTimeString(language, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		hourCycle: 'h12',
	});

	return {
		from: formattedFromTime.match(/\d{1,2}:\d{2}\s(AM|PM)/)[0].toLocaleLowerCase(),
		to: formattedToTime.match(/\d{1,2}:\d{2}\s(AM|PM)/)[0].toLocaleLowerCase(),
	};
};

export default timeArray;
