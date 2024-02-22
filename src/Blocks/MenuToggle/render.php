<?php

$target_id = $attributes['target'] ?? '';
$classNameBase = wp_get_block_default_classname($block->name);
$color_class = $attributes['textColor'] ?? '';
$color_class = !empty($color_class) ? ' has-text-color has-' . $color_class . '-color' : '';
$align = $attributes['align'] ?? '';
$align_class = !empty($align) ? ' align' . $align : '';

?>

<button class="<?php echo $classNameBase . $color_class . $align_class; ?>" aria-controls="<?php echo $target_id; ?>" data-root-style="is--mobilemenu--open">
	<svg viewbox="0 0 35 20">
		<g>
			<path class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--1" d="M0,1.4 L35,1.4 Z"></path>
			<path class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--2" d="M0,9.5 L35,9.5 Z"></path>
			<path class="<?php echo $classNameBase; ?>__line <?php echo $classNameBase; ?>__line--3" d="M0,18.6 L35,18.6 Z"></path>
		</g>
	</svg>
</button>