import gulp from 'gulp';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import gulpFilter from 'gulp-filter';
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';

export const task = (config) => {
	const jsFilter = gulpFilter(['**/*.js'], { restore: true });

	return (
		gulp
			.src([`${config.assetsBuild}gutenberg/blocks.js`])
			.pipe(
				gulpWebpack(
					{
						mode: 'production',
						module: {
							rules: [
								{
									test: /\.(js|jsx)$/,
									exclude: /node_modules/,
									loader: 'babel-loader',
								},
								{
									test: /\.css$/i,
									exclude: /node_modules/,
									use: ['style-loader', 'css-loader'],
								},
								{
									test: /\.scss$/i,
									exclude: /node_modules/,
									use: ['style-loader', 'css-loader', 'sass-loader'],
								},
							],
						},
						watchOptions: {
							poll: true,
							ignored: /node_modules/,
						},
						output: {
							filename: 'blocks.js',
						},
						plugins: [new DependencyExtractionWebpackPlugin()],
					},
					webpack
				)
			)
			.on('error', config.errorLog)
			.pipe(gulp.dest(`${config.assetsDir}gutenberg/`))

			// Minify JS
			.pipe(jsFilter)
			.pipe(uglify())
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			.on('error', config.errorLog)
			.pipe(gulp.dest(`${config.assetsDir}gutenberg/`))
	);
};
