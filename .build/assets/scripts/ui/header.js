const header = document.querySelector('.c-header');

if (header) {
	const stuck = () => {
			if (window.scrollY > 50) {
				header.classList.add('with--background');
			} else {
				header.classList.remove('with--background');
			}
		},
		height = () => {
			document.documentElement.style.setProperty('--header--height', header.offsetHeight - 1 + 'px');
		};

	stuck();
	height();
	window.addEventListener('scroll', stuck);
	window.addEventListener('resize', height);
	window.addEventListener('orientationchange', height);
}
