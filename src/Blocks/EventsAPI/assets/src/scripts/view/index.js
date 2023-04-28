import { createRoot, useEffect, useState } from '@wordpress/element';

import legibleDate from './_legible-date';

const App = ({ element: { dataset }, classNameBase }) => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);

	const { root: api_root, nonce } = wpApiSettings;
	const { url } = dataset;

	const language_full = document.documentElement.lang;
	const language_short = language_full.substring(0, 2);

	useEffect(() => {
		setLoading(true);
		fetch(`${api_root}sht/v1/events`, {
			method: 'POST',
			headers: {
				'X-WP-Nonce': nonce,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url: url,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				const { events } = data;
				setEvents(events);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return 'Loading...';
	}

	if (!events.length) {
		return 'No current events';
	}

	return (
		<div className={classNameBase}>
			<div className={`${classNameBase}__entries`}>
				{events.map((event) => {
					const dateString = legibleDate({ date_from: event.date, date_to: event.end_date, language_full, language_short });
					return (
						<div className={`${classNameBase}__entry`}>
							<div className={`${classNameBase}__entry-title`} dangerouslySetInnerHTML={{ __html: event.title }} />
							<div className={`${classNameBase}__entry-dates`} dangerouslySetInnerHTML={{ __html: dateString }} />
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
