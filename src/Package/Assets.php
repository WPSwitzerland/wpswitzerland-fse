<?php

namespace SayHello\Theme\Package;

/**
 * Assets (CSS, JavaScript etc)
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Assets
{

	public $theme_url = '';
	public $theme_path = '';
	private $debug = false;

	public function __construct()
	{
		$this->debug = defined('WP_DEBUG') && WP_DEBUG === false;
	}

	public function run()
	{
		add_action('wp_enqueue_scripts', [$this, 'registerAssets']);
		add_action('admin_enqueue_scripts', [$this, 'registerAdminAssets']);
		add_action('after_setup_theme', [$this, 'editorStyle']);
	}

	public function registerAssets()
	{

		if (!is_user_logged_in()) {
			wp_deregister_style('dashicons');
		}

		/**
		 * CSS
		 */
		$deps = ['wp-block-library'];

		wp_enqueue_style('fancybox', get_template_directory_uri() . '/assets/plugins/fancybox/jquery.fancybox.min.css', [], '3.4.0');
		$deps[] = 'fancybox';

		wp_enqueue_style('sht-style', get_template_directory_uri() . '/assets/styles/ui' . (!$this->debug ? '.min' : '') . '.css', $deps, filemtime(get_template_directory() . '/assets/styles/ui' . (!$this->debug ? '.min' : '') . '.css'));

		// Javascript
		$deps = [];

		wp_enqueue_script('fancybox', get_template_directory_uri() . '/assets/plugins/fancybox/jquery.fancybox.min.js', ['jquery'], '3.4.0', true);
		$deps[] = 'fancybox';

		wp_enqueue_script('sht-script', get_template_directory_uri() . '/assets/scripts/ui' . (!$this->debug ? '.min' : '') . '.js', $deps, filemtime(get_template_directory() . '/assets/scripts/ui' . (!$this->debug ? '.min' : '') . '.js'), true);
		wp_localize_script('sht-script', 'sht_theme', [
			'directory_uri' => get_template_directory_uri(),
			'version' => wp_get_theme()->get('Version')
		]);
	}

	public function registerAdminAssets()
	{
		wp_enqueue_style('sht-admin-style', get_template_directory_uri() . '/assets/styles/admin' . ($this->debug ? '' : '.min') . '.css', ['sht-admin-editor-style', 'wp-edit-blocks'], filemtime(get_template_directory() . '/assets/styles/admin' . ($this->debug ? '' : '.min') . '.css'));
	}

	public function editorStyle()
	{
		add_theme_support('editor-styles');
		add_editor_style('assets/styles/admin-editor' . ($this->debug ? '' : '.min') . '.css');
	}
}
