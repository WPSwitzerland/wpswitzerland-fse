<?php

namespace SayHello\Theme\Block;

use SayHello\Theme\Package\Gutenberg as GutenbergController;

use WP_REST_Response;

/**
 * Menu Block
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Menu
{

	public function run()
	{
		add_action('init', [$this, 'registerBlocks']);
		add_action('rest_api_init', [$this, 'endpoints']);
	}

	public function registerBlocks()
	{
		register_block_type('sht/menu', [
			'render_callback' => [$this, 'renderBlock'],
			'attributes' => [
				'menu' => [
					'type'  => 'string',
				],
			],
		]);
	}

	public function renderBlock($attributes)
	{
		$controller = new GutenbergController();
		ob_start();

		if (empty($theme_location = $attributes['menu'] ?? '')) {
			if ($controller->isContextEdit()) {
?>
				<div class="c-editormessage c-editormessage--error"><?php _ex('Bitte wÃ¤hlen Sie eine vordefinierte Navigation aus.', 'Menu block editor message', 'sha'); ?></div>
			<?php
			}
		} else {

			?>
			<div class="wp-block-sht-menu wp-block-sht-menu--<?php echo $theme_location; ?>">
				<?php
				wp_nav_menu(
					[
						'theme_location' => $theme_location,
						'container' => 'nav',
						'container_class' => 'c-menu c-menu--block-menu c-menu--' . $theme_location,
						'menu_class' => 'c-menu c-menu--block-menu c-menu--' . $theme_location,
					]
				);
				?>
			</div>

<?php
		}
		$html = ob_get_contents();
		ob_end_clean();
		return $html;
	}

	/**
	 * Register custom REST API endpoints
	 *
	 * @return void
	 */
	public function endpoints()
	{
		register_rest_route('sht', '/menus', [
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => function () {
				if (empty($nav_menus = wp_get_nav_menus())) {
					return new WP_REST_Response($nav_menus);
				}

				$response_data = [];

				foreach (array_values($nav_menus) as $values) {
					$response_data[] = [
						'slug' => $values->slug,
						'id' => $values->term_id,
						'title' => $values->name
					];
				}

				return new WP_REST_Response($response_data);
			},
		]);

		register_rest_route('sht', '/menu-positions', [
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => function () {
				if (empty($nav_menus = get_registered_nav_menus())) {
					return new WP_REST_Response($nav_menus);
				}

				$response_data = [];

				foreach ($nav_menus as $key => $label) {
					$response_data[] = [
						'id' => $key,
						'title' => $label
					];
				}

				return new WP_REST_Response($response_data);
			},
		]);
	}
}
