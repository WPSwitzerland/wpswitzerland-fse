import gulp from 'gulp';

import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';

export const task = (config) => {
	return gulp
		.src([config.assetsDir + '**/*.svg', '!' + config.assetsDir + '**/*.min.svg'])
		.pipe(
			svgmin({
				plugins: [
					{
						removeViewBox: false,
					},
				],
			})
		)
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.on('error', config.errorLog)
		.pipe(gulp.dest(config.assetsDir));
};
