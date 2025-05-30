<?php

namespace SayHello\Theme;

/**
 * Theme class which gets loaded in functions.php.
 * Defines the Starting point of the Theme and registers Packages.
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Theme
{

	/**
	 * the instance of the object, used for singelton check
	 *
	 * @var object
	 */
	private static $instance;

	/**
	 * Theme name
	 *
	 * @var string
	 */
	public $name = '';

	/**
	 * Theme version
	 *
	 * @var string
	 */
	public $version = '';

	/**
	 * Debug mode
	 *
	 * @var bool
	 */
	public $debug = false;

	/**
	 * The Theme object, filled by the constructor
	 *
	 * @var object
	 */
	private $theme;

	public function __construct()
	{
		$this->theme = wp_get_theme();
	}

	public function run()
	{
		$this->loadClasses(
			[
				// Block\Menu::class,
				Blocks\EventsAPI\Block::class,
				Blocks\Menu\Block::class,
				Blocks\MenuToggle\Block::class,

				Controller\BlockBindings::class,

				Package\Assets::class,
				Package\Gutenberg::class,
				Package\Language::class,
				Package\Media::class,
				Package\Navigation::class,
				Package\RSSCollator::class,
				Package\Shyify::class,
			]
		);

		add_action('after_setup_theme', [$this, 'themeSupports']);
		add_action('comment_form_before', [$this, 'enqueueReplyScript']);
		add_action('wp_head', [$this, 'noJsScript']);
		add_filter('body_class', [$this, 'bodyClasses'], 10, 1);

		$this->cleanHead();
	}

	/**
	 * Creates an instance if one isn't already available,
	 * then return the current instance.
	 *
	 * @return object       The class instance.
	 */
	public static function getInstance()
	{
		if (!isset(self::$instance) && !(self::$instance instanceof Theme)) {
			self::$instance = new Theme;

			self::$instance->name    = self::$instance->theme->name;
			self::$instance->version = self::$instance->theme->version;
			self::$instance->debug   = true;

			if (!isset($_SERVER['HTTP_HOST']) || (strpos($_SERVER['HTTP_HOST'], '.hello') === false && strpos($_SERVER['HTTP_HOST'], '.local') === false) && !in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1'])) {
				self::$instance->debug = false;
			}
		}

		return self::$instance;
	}

	/**
	 * Loads and initializes the provided classes.
	 *
	 * @param $classes
	 */
	private function loadClasses($classes)
	{
		foreach ($classes as $class) {
			$instance = new $class();

			if (method_exists($instance, 'run')) {
				$instance->run();
			}
		}
	}

	/**
	 * Allow the Theme to use additional core features
	 */
	public function themeSupports()
	{
		add_theme_support('automatic-feed-links');
		add_theme_support('custom-logo');
		add_theme_support('html5', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script']);
		add_theme_support('post-thumbnails', ['post']);
		add_theme_support('title-tag');
	}

	public function cleanHead()
	{
		remove_action('wp_head', 'wp_generator');
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('wp_print_styles', 'print_emoji_styles');
	}

	/**
	 * Adds a JS script to the head that removes 'no-js' from the html class list
	 */
	public function noJsScript()
	{
		echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>" . chr(10);
	}

	public function enqueueReplyScript()
	{
		if (is_singular() && get_option('thread_comments')) {
			wp_enqueue_script('comment-reply');
		}
	}

	/**
	 * Provides a function that adds custom
	 * css Classes to Website
	 *
	 * @param array $classes Default body classes
	 *
	 * @return array Containing all necessary Classes
	 */
	public function bodyClasses(array $classes)
	{
		$classes[] = 'no-js';

		if ($this->debug) {
			$classes[] = 'c-body--themedev';
		}

		return $classes;
	}
}
