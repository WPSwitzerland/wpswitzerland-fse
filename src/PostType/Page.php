<?php

namespace SayHello\Theme\PostType;

class Page
{
	public function run()
	{
		add_action('init', [$this, 'blockTemplate']);
	}

	/**
	 * Creates a block template for every new page
	 *
	 * @return void
	 */
	public function blockTemplate()
	{
		$post_type_object = get_post_type_object('page');

		$post_type_object->template = [
			[
				'core/cover', [
					"align" => 'full',
					"useFeaturedImage" => true,
					"dimRatio" => 90,
					"minHeight" => 20,
					"minHeightUnit" => "vw",
					"gradient" => "wordpress-blue",
					"contentPosition" => "bottom left",
					"isDark" => "false",
					"isDark" => "false",
					"focalPoint" => ["x" => "0.50", "y" => "0.50"],
					'lock' => [
						'move'   => true,
						'remove' => true,
					],
				],
				[
					[
						"core/group", [], [
							['core/post-title', ["level" => 1, "align" => "wide", "textColor" => "white"]],
						]
					]
				]
			],
			[
				'core/paragraph', [
					'placeholder' => 'Add content here...',
				]
			]
		];
	}
}
