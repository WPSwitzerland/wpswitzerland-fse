import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import { dest } from 'gulp';
import rename from 'gulp-rename';
import { globSync } from 'glob';
import path from 'path';
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';

export const task = (config) => {
	const files = globSync(config.blockScriptsSrc);
	const entries = {};

	files.forEach((file) => {
		const base = path.basename(file);
		if (base.startsWith('_')) return;

		const folders = path.dirname(file).split('/');
		const folder_last = folders[folders.length - 1];
		if (folder_last.startsWith('_')) return;

		entries[`${folders[2]}_${folder_last}`] = path.resolve(file);
	});

	if (!Object.keys(entries).length) {
		console.log('No valid entries.');
		return Promise.resolve();
	}

	return gulpWebpack(
		{
			entry: entries,
			mode: 'production',
			module: {
				rules: [
					{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
					{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
					{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
				],
			},
			output: {
				filename: '[name].js',
			},
			externals: {
				jquery: 'jQuery',
			},
			plugins: [new DependencyExtractionWebpackPlugin()],
		},
		webpack
	)
		.pipe(
			rename((path) => {
				const [folder, name] = path.basename.split('_');
				path.dirname = `${config.blockScriptsDist}${folder}/assets/dist/scripts/`;
				path.basename = name;
				path.extname = '.js';
			})
		)
		.pipe(dest('./'));
};
