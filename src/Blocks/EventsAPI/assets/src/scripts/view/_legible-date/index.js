import addOrdinalSuffix from '../_add-ordinal-suffix/index.js';
import timeArray from '../_time-array/index.js';

export const legibleDate = (props) => {
	const { date_from, date_to, language_short, language_full } = props;
	const date_from_bits = date_from.split(' ');
	const date_from_date = date_from_bits[0].split('-');
	const date_from_time = date_from_bits[1];

	const date_to_bits = date_to.split(' ');
	const date_to_date = date_to_bits[0].split('-');
	const date_to_time = date_to_bits[1];

	const from = new Date(date_from_date[0], date_from_date[1] - 1, date_from_date[2], ...date_from_time.split(':'));
	const to = new Date(date_to_date[0], date_to_date[1] - 1, date_to_date[2], ...date_to_time.split(':'));

	const showTime = !(date_from_time === '00:00:00' && date_to_time === '00:00:00');

	const times = showTime ? timeArray({ date_from: from, date_to: to, language: language_full }) : null;

	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		...(showTime && { hour: 'numeric', minute: 'numeric' }),
	};

	let fromTo = '';

	if (from.getDate() === to.getDate() && from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
		switch (language_short) {
			case 'en':
				let timeString = '';
				if (showTime) {
					if (times['from'] === times['to']) {
						timeString = times['from'] !== '00:00' ? `, ${times['from']}` : '';
					} else {
						timeString = `, ${times['from']} - ${times['to']}`;
					}
				}
				fromTo = `${addOrdinalSuffix(from.getDate())} ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}${timeString}`;
				break;
			default:
				fromTo = from.toLocaleDateString(language_full, options);
				break;
		}
	} else if (from.getMonth() === to.getMonth()) {
		switch (language_short) {
			case 'de':
				fromTo = `${from.getDate()}. bis ${to.getDate()}. ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}`;
				if (showTime) fromTo += `, von ${times['from']} bis ${times['to']}`;
				break;
			case 'fr':
				fromTo = `${from.getDate()} - ${to.getDate()} ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}`;
				if (showTime) fromTo += `, de ${times['from']} jusqu'a ${times['to']}`;
				break;
			default:
				fromTo = `${addOrdinalSuffix(from.getDate())} - ${addOrdinalSuffix(to.getDate())} ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}`;
				if (showTime) fromTo += `, from ${times['from']} to ${times['to']}`;
				break;
		}
	} else {
		switch (language_short) {
			case 'de':
				fromTo = `${from.toLocaleDateString(language_full, options)} bis ${to.toLocaleDateString(language_full, options)}`;
				break;
			case 'fr':
				fromTo = `${from.toLocaleDateString(language_full, options)} jusqu'au ${to.toLocaleDateString(language_full, options)}`;
				break;
			default:
				fromTo = `${addOrdinalSuffix(from.getDate())} ${from.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })} to ${addOrdinalSuffix(to.getDate())} ${to.toLocaleDateString(language_full, { month: 'long', year: 'numeric' })}`;
				if (showTime) fromTo += `, from ${times['from']} to ${times['to']}`;
				break;
		}
	}

	return fromTo;
};

export default legibleDate;
