<?php

use SayHello\Theme\Controller\Block as BlockController;

if (empty($theme_location = $attributes['menu'] ?? '')) {
	return;
}

$page_language = get_post_meta(get_the_ID(), 'current_page_language', true);

if (!empty($page_language)) {
	$theme_location = $theme_location . '_' . $page_language;
}

$block_controller = new BlockController;
$block_controller->extend($block);

$class_names = $block['shp']['class_names'];
$classNameDefault = $block['shp']['classNameDefault'];

$class_names .= " {$classNameDefault}--{$theme_location}";

$menu_id = "block_{$block['attributes']['blockId']}";

?>
<nav class="<?php echo $class_names; ?>">
	<div class="<?php echo $classNameDefault; ?>__nav-wrapper" id="<?php echo $menu_id; ?>">
		<?php
		wp_nav_menu(
			[
				'theme_location' => $theme_location,
				'container' => 'nav',
				'container_class' => "{$classNameDefault}__container {$classNameDefault}__container--{$theme_location}",
				'menu_class' => "{$classNameDefault}__entries {$classNameDefault}__entries--{$theme_location}",
				'fallback_cb' => false,
				'depth' => 1,
			]
		);
		?>
	</div>
</nav>