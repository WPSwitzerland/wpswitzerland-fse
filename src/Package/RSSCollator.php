<?php

namespace SayHello\Theme\Package;

use SimpleXMLElement;

/**
 * Add RSS Collation functionality
 */
class RSSCollator
{

	/**
	 * The custom post type.
	 *
	 * @var string
	 */
	protected $postType = 'rss-collator';

	/**
	 * The unique identifier for the settings page.
	 *
	 * @var string
	 */
	protected $pageSlug = 'rss-collator';

	/**
	 * The name of the setting that stores the RSS feed URLs.
	 *
	 * @var string
	 */
	protected $settingName = 'collate_rss_feeds';

	public function run()
	{
		add_action('admin_menu', [$this, 'addSettingsPage']);
		add_action('admin_init', [$this, 'registerSettings']);
		add_action('init', [$this, 'registerPostType']);
		add_filter('post_type_link', [$this, 'rssCollatorPostLink'], 10, 2);
		add_filter('manage_' . $this->postType . '_posts_columns', [$this, 'addAdminColumn']);
		add_action('manage_' . $this->postType . '_posts_custom_column', [$this, 'renderAdminColumn'], 10, 2);

		// redirect archive page to the home page
		add_action('template_redirect', [$this, 'redirectArchivePage']);

		add_action('sht_wpswitzerland_fse_get_rss', [$this, 'getRssFeedContents']);
		$this->scheduleCronJob();
	}

	/**
	 * Add the custom settings page.
	 */
	public function addSettingsPage()
	{
		add_options_page(
			__('RSS Collator', 'wpswitzerland-fse'),
			__('RSS Collator', 'wpswitzerland-fse'),
			'manage_options',
			$this->pageSlug,
			[$this, 'renderSettingsPage']
		);
	}

	/**
	 * Render the custom settings page.
	 */
	public function renderSettingsPage()
	{
?>
		<div class="wrap">
			<h1><?php echo esc_html__('RSS Collator', 'wpswitzerland'); ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields($this->settingName);
				do_settings_sections($this->pageSlug);
				submit_button();
				?>
			</form>
		</div>
	<?php
	}

	/**
	 * Register the custom settings.
	 */
	public function registerSettings()
	{
		register_setting($this->settingName, $this->settingName, [$this, 'sanitizeUrls']);

		add_settings_section(
			'custom_settings_section',
			__('RSS Feeds', 'wpswitzerland'),
			null,
			$this->pageSlug
		);

		add_settings_field(
			'collate_rss_feeds_field',
			__('Add RSS Feeds', 'wpswitzerland'),
			[$this, 'renderUrlsField'],
			$this->pageSlug,
			'custom_settings_section'
		);
	}

	public function redirectArchivePage()
	{
		if (is_post_type_archive($this->postType)) {
			wp_redirect(home_url(), 301);
			exit;
		}
	}

	/**
	 * Sanitize the submitted URLs.
	 *
	 * @param array $urls The array of submitted URLs.
	 * @return array The sanitized array of URLs.
	 */
	public function sanitizeUrls($urls)
	{
		$sanitizedUrls = [];

		if (is_array($urls)) {
			foreach ($urls as $url) {
				$sanitizedUrl = esc_url_raw($url);
				if ($sanitizedUrl) {
					$sanitizedUrls[] = $sanitizedUrl;
				}
			}
		}

		return $sanitizedUrls;
	}

	/**
	 * Render the URLs field.
	 */
	public function renderUrlsField()
	{
		$urls = get_option($this->settingName, []);

	?>
		<div id="collate_rss_feeds_container">
			<?php
			if ($urls) {
				foreach ($urls as $index => $url) {
					$inputId = 'collate_rss_feed_' . $index;
			?>
					<p>
						<input type="text" id="<?php echo esc_attr($inputId); ?>" name="<?php echo esc_attr($this->settingName); ?>[]" value="<?php echo esc_attr($url); ?>" class="regular-text">
						<?php if ($index > 0) { ?>
							<button type="button" class="button collate-rss-feeds-remove"><?php esc_html_e('Remove', 'wpswitzerland'); ?></button>
						<?php } ?>
					</p>
				<?php
				}
			} else {
				?>
				<p>
					<input type="text" name="<?php echo esc_attr($this->settingName); ?>[]" class="regular-text">
				</p>
			<?php
			}
			?>
			<button type="button" class="button collate-rss-feeds-add"><?php esc_html_e('Add URL', 'wpswitzerland'); ?></button>
		</div>
		<script>
			jQuery(document).ready(function($) {
				var container = $('#collate_rss_feeds_container');
				var addButton = container.find('.collate-rss-feeds-add');
				var removeButton = container.find('.collate-rss-feeds-remove');

				addButton.on('click', function() {
					var input = $('<input type="text" class="regular-text" name="<?php echo esc_attr($this->settingName); ?>[]">');
					var removeButton = $('<button type="button" class="button collate-rss-feeds-remove"><?php esc_html_e('Remove', 'wpswitzerland'); ?></button>');

					var newField = $('<p></p>').append(input).append(removeButton);
					container.append(newField);
				});

				container.on('click', '.collate-rss-feeds-remove', function() {
					$(this).parent().remove();
				});
			});
		</script>
<?php
	}

	/**
	 * Retrieve RSS feed contents from an array of feeds.
	 *
	 * @param array $feeds Array of RSS feed URLs.
	 * @return array|bool Array of feed contents or false on failure.
	 */
	public function getRssFeedContents()
	{
		$feeds = get_option($this->settingName, []);

		$feedContents = [];

		foreach ($feeds as $feedUrl) {
			$response = wp_remote_get($feedUrl);

			if (!is_wp_error($response) && 200 === wp_remote_retrieve_response_code($response)) {
				$feed_body = wp_remote_retrieve_body($response);

				//	parse $feed_body and get each <item> from the <channel>
				$feed = @simplexml_load_string($feed_body);

				if (!$feed instanceof SimpleXMLElement) {
					error_log("Invalid feed at $feedUrl");
					continue;
				}

				$feedContents[$feedUrl] = [
					'title' => $feed->channel->title,
					'link' => $feed->channel->link,
					'items' => []
				];

				foreach ($feed->channel->item as $item) {
					$feedContents[$feedUrl]['items'][] = [
						'title' => $item->title,
						'link' => $item->link,
						'description' => $item->description,
						'content' => $item->children('content', true)->encoded ?? '', // Use content:encoded if available
						'pubDate' => $item->pubDate
					];
				}
			}
		}

		if (!empty($feedContents)) {
			$posts = get_posts([
				'numberposts' => -1,
				'post_type' => $this->postType,
				'post_status' => 'any'
			]);

			foreach ($posts as $post) {
				wp_delete_post($post->ID, true);
			}

			foreach ($feedContents as $feedUrl => $feedContent) {
				$source = esc_html($feedContent['title']);
				$source_link = esc_url($feedContent['link']);

				foreach ($feedContent['items'] as $feedItem) {
					// $title = "{$source} - {$feedItem['title']}";
					$title = $feedItem['title'];
					$link = sanitize_url($feedItem['link']);

					$postData = [
						'post_title' => $title,
						'post_content' => $feedItem['content'] ?? '',
						'post_date' => wp_date('Y-m-d H:i:s', strtotime($feedItem['pubDate'])),
						'post_type' => $this->postType,
						'post_status' => 'publish',
						'post_excerpt' => $feedItem['description'] ?? '',
					];

					$post_id = wp_insert_post($postData);

					if ($post_id) {
						update_post_meta($post_id, 'feed_item_url', $link);
						update_post_meta($post_id, 'feed_item_source', $source);
						update_post_meta($post_id, 'feed_link', $source_link);
					}
				}
			}
		}


		return $feedContents;
	}

	/**
	 * Schedule the hourly cron job.
	 */
	public function scheduleCronJob()
	{
		if (!wp_next_scheduled('sht_wpswitzerland_fse_get_rss')) {
			wp_schedule_event(time(), 'hourly', 'sht_wpswitzerland_fse_get_rss');
		}
	}

	/**
	 * registerPostType
	 */
	public function registerPostType()
	{
		register_post_type($this->postType, [
			'labels' => [
				'name' => __('RSS Posts', 'wpswitzerland'),
				'singular_name' => __('RSS Post', 'wpswitzerland'),
				'add_new' => __('Add New', 'wpswitzerland'),
				'add_new_item' => __('Add New RSS Post', 'wpswitzerland'),
				'edit_item' => __('Edit RSS Post', 'wpswitzerland'),
				'new_item' => __('New RSS Post', 'wpswitzerland'),
				'view_item' => __('View RSS Post', 'wpswitzerland'),
				'view_items' => __('View RSS Posts', 'wpswitzerland'),
				'search_items' => __('Search RSS Posts', 'wpswitzerland'),
				'not_found' => __('No RSS Posts found', 'wpswitzerland'),
				'not_found_in_trash' => __('No RSS Posts found in Trash', 'wpswitzerland'),
				'parent_item_colon' => __('Parent RSS Post:', 'wpswitzerland'),
				'menu_name' => __('RSS Posts', 'wpswitzerland'),
				'all_items' => __('All RSS Posts', 'wpswitzerland'),
				'archives' => __('RSS Post Archives', 'wpswitzerland'),
				'attributes' => __('RSS Post Attributes', 'wpswitzerland'),
				'insert_into_item' => __('Insert into RSS Post', 'wpswitzerland'),
				'uploaded_to_this_item' => __('Uploaded to this RSS Post', 'wpswitzerland'),
				'featured_image' => __('Featured Image', 'wpswitzerland'),
				'set_featured_image' => __('Set featured image', 'wpswitzerland'),
				'remove_featured_image' => __('Remove featured image', 'wpswitzerland'),
				'use_featured_image' => __('Use as featured image', 'wpswitzerland'),
				'filter_items_list' => __('Filter RSS Posts list', 'wpswitzerland'),
				'items_list_navigation' => __('RSS Posts list navigation', 'wpswitzerland'),
				'items_list' => __('RSS Posts list', 'wpswitzerland'),
				'item_published' => __('RSS Post published', 'wpswitzerland'),
				'item_published_privately' => __('RSS Post published privately', 'wpswitzerland'),
				'item_reverted_to_draft' => __('RSS Post reverted to draft', 'wpswitzerland'),
				'item_scheduled' => __('RSS Post scheduled', 'wpswitzerland'),
				'item_updated' => __('RSS Post updated', 'wpswitzerland'),
			],
			'public' => true,
			'has_archive' => true,
			'supports' => ['title', 'custom-fields', 'excerpt', 'editor'],
			'menu_icon' => 'dashicons-rss',
			'show_in_rest' => true,
			'rewrite' => [
				'slug' => 'collated-posts'
			],
		]);
	}

	public function rssCollatorPostLink($link, $post)
	{
		if ($post->post_type !== $this->postType) {
			return $link;
		}

		$feedUrl = get_post_meta($post->ID, 'feed_item_url', true);

		if ($feedUrl) {
			return $feedUrl;
		}

		return $link;
	}

	public function addAdminColumn($columns)
	{
		$columns['feed_item_source'] = __('Source', 'wpswitzerland');
		$columns['feed_item_url'] = __('URL', 'wpswitzerland');
		return $columns;
	}

	public function renderAdminColumn($column, $post_id)
	{

		if ($column === 'feed_item_source') {
			echo get_post_meta($post_id, 'feed_item_source', true);
		}

		if ($column === 'feed_item_url') {
			echo sanitize_url(get_post_meta($post_id, 'feed_item_url', true));
		}
	}
}
