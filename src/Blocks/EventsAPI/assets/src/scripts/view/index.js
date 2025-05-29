import { createRoot, useEffect, useState } from '@wordpress/element';

import legibleDate from './_legible-date/index.js';

const App = ({ element: { dataset }, classNameBase }) => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);

	const { root: api_root } = wpApiSettings;
	const { url } = dataset;

	let language_full = document.documentElement.lang;
	const language_short = language_full.substring(0, 2);

	if (language_short === 'en') {
		language_full = 'en-GB';
	}

	useEffect(() => {
		setLoading(true);
		fetch(`${api_root}sht/v1/events?url=${url}&per_page=100`, {
			headers: {
				// Do not include a nonce, or the validation will always fail.
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setEvents(data);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return 'Loading...';
	}

	if (!events || !events.length) {
		return 'No current events';
	}

	let columns = 1;

	if (events.length > 6) {
		columns = 2;
	}

	if (events.length > 10) {
		columns = 3;
	}

	return (
		<div className={classNameBase}>
			<div className={`${classNameBase}__entries ${classNameBase}__entries--cols-${columns}`}>
				{events.map((event) => {
					let dateString = legibleDate({ date_from: event.date, date_to: event.end_date, language_full, language_short });

					if (event.location?.location) {
						dateString += `, ${event.location.location}`;
					}

					return (
						<div className={`${classNameBase}__entry`}>
							<div className={`${classNameBase}__entry-title`}>
								{event.url && <a target="_blank" href={event.url} dangerouslySetInnerHTML={{ __html: event.title }} />}
								{!event.url && <span dangerouslySetInnerHTML={{ __html: event.title }} />}
							</div>
							<div className={`${classNameBase}__entry-dates`} dangerouslySetInnerHTML={{ __html: dateString }} />
							<div className={`${classNameBase}__entry-organizer`}>
								{event.meetup_url && <a target="_blank" href={event.meetup_url} dangerouslySetInnerHTML={{ __html: event.meetup }} />}
								{!event.meetup_url && <span dangerouslySetInnerHTML={{ __html: event.meetup }} />}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const { class_name_base } = sht_theme;

const elements = document.querySelectorAll(`.${class_name_base}`);

if (elements) {
	elements.forEach((element) => {
		const root = createRoot(element);
		root.render(<App element={element} classNameBase={class_name_base} />);
	});
}
