<?php

use SayHello\Theme\Controller\Block as BlockController;

$block_controller = new BlockController();
$block_controller->extend($block);

$script = '/src/Blocks/EventsAPI/assets/dist/scripts/view.js';
wp_enqueue_script($block['shp']['classNameBase'], sht_theme()->url . $script, ['wp-element', 'wp-i18n', 'wp-api'], filemtime(sht_theme()->path . $script), true);

// add rest api data including nonce to script
wp_localize_script($block['shp']['classNameBase'], 'sht_theme', [
	'class_name_base' => $block['shp']['classNameBase']
]);

$apiUrl = esc_url_raw($attributes['apiUrl'] ?? '');

?>

<div class="<?php echo $block['shp']['class_names']; ?>" data-class-name-base="<?php echo $block['shp']['classNameBase']; ?>" data-url="<?php echo $apiUrl ?? ''; ?>"></div>
