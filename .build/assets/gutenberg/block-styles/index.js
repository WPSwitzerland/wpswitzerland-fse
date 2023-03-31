// import domReady from '@wordpress/dom-ready';
import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';

window.addEventListener('load', () => {
	registerBlockStyle('core/list', {
		name: 'less-gap',
		label: 'Less gap',
	});
});

window.addEventListener('load', () => {
	unregisterBlockStyle('core/image', 'default');
	unregisterBlockStyle('core/image', 'rounded');
});
