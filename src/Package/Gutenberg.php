<?php

namespace SayHello\Theme\Package;

/**
 * Adjustments for the Gutenberg Editor
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Gutenberg
{
	private $min = true;

	public function __construct()
	{
		if (defined('WP_DEBUG') && WP_DEBUG) {
			$this->min = false;
		}
	}

	public function run()
	{
		add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockAssets']);
		add_filter('block_categories_all', [$this, 'blockCategories']);
		add_action('after_setup_theme', [$this, 'themeSupports']);
		add_action('init', [$this, 'setScriptTranslations']);
		add_filter('admin_body_class', [$this, 'extendAdminBodyClass']);
	}

	public function themeSupports()
	{
		// Since WordPress 5.5: disallow block patterns delivered by Core
		remove_theme_support('core-block-patterns');

		add_editor_style('assets/styles/admin-editor.min.css');
	}

	public function enqueueBlockAssets()
	{
		$script_asset_path = get_theme_file_path('/assets/gutenberg/blocks.asset.php');
		$script_asset = require($script_asset_path);

		wp_enqueue_script(
			'sht-gutenberg-script',
			get_theme_file_path('/assets/gutenberg/blocks' . ($this->min ? '.min' : '') . '.js'),
			$script_asset['dependencies'],
			$script_asset['version']
		);
	}

	/**
	 * https://github.com/SayHelloGmbH/hello-roots/wiki/Translation-in-JavaScript
	 *
	 * Make sure that the JSON files are at e.g.
	 * 'languages/sht-de_DE_formal-739d784e82179214dfd2a6c345374e30.json' or
	 * 'languages/sht-fr_FR-739d784e82179214dfd2a6c345374e30.json'
	 *
	 * mhm 28.1.2020
	 */
	public function setScriptTranslations()
	{
		wp_set_script_translations('sht-gutenberg-script', 'sht', get_template_directory() . '/languages');
	}

	public function blockCategories($categories)
	{
		return array_merge($categories, [
			[
				'slug'  => 'sht/blocks',
				'title' => _x('Blöcke von Say Hello', 'Custom block category name', 'sha'),
			],
		]);
	}

	public function isContextEdit()
	{
		return array_key_exists('context', $_GET) && $_GET['context'] === 'edit';
	}

	/**
	 * Add a CSS class name to the admin body, containing current post
	 * name and post type.
	 * @param  string $classes The pre-existing body class name/s
	 * @return string
	 */
	public function extendAdminBodyClass($classes)
	{
		global $post;
		if ($post->post_type ?? false && $post->post_name ?? false) {
			global $post;
			$classes .= ' post-type-' . $post->post_type . ' post-type-' . $post->post_type . '--' . $post->post_name;
		}
		return $classes;
	}
}
