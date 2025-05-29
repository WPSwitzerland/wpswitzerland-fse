<?php

namespace SayHello\Theme\Controller;

/**
 * Handles block bindings.
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */

class BlockBindings
{

	public function run()
	{
		add_action('init', [$this, 'registerSources']);
	}

	public function registerSources()
	{
		register_block_bindings_source(
			'sht/rss-feed-source',
			[
				'label' => __('Feed Source', 'themeslug'),
				'get_value_callback' => [$this, 'getFeedSource']
			]
		);

		register_block_bindings_source(
			'sht/rss-item-source',
			[
				'label' => __('RSS Item Source', 'themeslug'),
				'get_value_callback' => [$this, 'getItemSource']
			]
		);
	}

	public function getFeedSource()
	{

		$feed_link = get_post_meta(get_the_ID(), 'feed_link', true);
		$feed_item_source = get_post_meta(get_the_ID(), 'feed_item_source', true);

		if (empty($feed_link) && empty($feed_item_source)) {
			return '';
		}

		if (empty($feed_link)) {
			return $feed_item_source;
		}

		return sprintf(
			'<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
			esc_url($feed_link),
			esc_html($feed_item_source)
		);
	}

	public function getItemSource()
	{

		$feed_item_url = get_post_meta(get_the_ID(), 'feed_item_url', true);
		$feed_item_source = get_post_meta(get_the_ID(), 'feed_item_source', true);

		if (empty($feed_item_url) && empty($feed_item_source)) {
			return '';
		}

		if (empty($feed_item_url)) {
			return $feed_item_source;
		}

		return sprintf(
			'<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
			esc_url($feed_item_url),
			esc_html($feed_item_source)
		);
	}
}
