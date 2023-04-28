import addOrdinalSuffix from '../_add-ordinal-suffix';
import timeArray from '../_time-array';

export const legibleDate = (props) => {
	const { date_from, date_to, language_short, language_full } = props;

	const from = new Date(date_from);
	const to = new Date(date_to);

	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	let fromTo = '';

	if (from.getDate() === to.getDate() && from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
		// If the date is the same day
		switch (language_short) {
			case 'en':
				let times = timeArray({ date_from: from, date_to: to, language: language_full });

				fromTo = `${addOrdinalSuffix(from.getDate())} ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}, from ${times['from']} until ${times['to']}`;
				break;
			default:
				fromTo = from.toLocaleDateString('fr-FR', options);
				break;
		}
	} else if (false && from.getMonth() === to.getMonth()) {
		// If it's the same month
		switch (language_short) {
			case 'de':
				fromTo = `${from.getDate()}. bis ${to.getDate()}. ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}`;
				break;
			case 'fr':
				fromTo = `${from.getDate()} - ${to.getDate()} ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}`;
				break;
			default:
				fromTo = `${addOrdinalSuffix(from.getDate())} - ${addOrdinalSuffix(to.getDate())} ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}`;
				break;
		}
	} else {
		// For all other cases
		switch (language_short) {
			case 'en':
				const tstr = timeString(from, to);

				// get hours and minutes portion of from date
				const fromTime = from.toLocaleTimeString(language_full, { hour: 'numeric', minute: 'numeric' }),
					toTime = to.toLocaleTimeString(language_full, { hour: 'numeric', minute: 'numeric' });

				fromTo = `${addOrdinalSuffix(from.getDate())} ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })} to ${addOrdinalSuffix(to.getDate())} ${to.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}`;
				break;
			default:
				fromTo = `${from.toLocaleDateString(language_full, options)} bis ${to.toLocaleDateString(language_full, options)}`;
				break;
		}
	}

	return fromTo;
};

export default legibleDate;
