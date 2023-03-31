const header = document.querySelector('.c-header'),
	cover = document.querySelector(
		'.wp-block-post-content .wp-block-cover:first-child'
	);

const stuck = () => {
		if (window.scrollY > 50) {
			header.classList.add('with--background');
		} else {
			header.classList.remove('with--background');
		}
	},
	height = () => {
		document.documentElement.style.setProperty(
			'--header--height',
			header.offsetHeight - 1 + 'px'
		);
	};

height();
window.addEventListener('scroll', stuck);
window.addEventListener('resize', height);
window.addEventListener('orientationchange', height);
