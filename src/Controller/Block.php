<?php

namespace SayHello\Theme\Controller;

use WP_Block;

/**
 * Handles generic block stuff
 *
 * @author Say Hello GmbH <hello@sayhello.ch>
 */

class Block
{
	private function basicClasses($attributes)
	{
		$class_names = [];
		$attributes =  (array) $attributes;

		if (!empty($attributes['align'] ?? '')) {
			$class_names[] = "align{$attributes['align']}";
		}

		if (!empty($attributes['backgroundColor'] ?? '')) {
			$class_names[] = "has-background";
			$class_names[] = "has-{$attributes['backgroundColor']}-background-color";
		}

		if (!empty($attributes['textColor'] ?? '')) {
			$class_names[] = "has-text-color";
			$class_names[] = "has-{$attributes['textColor']}-color";
		}

		return $class_names;
	}

	public function classNames($block)
	{

		// ACF block
		if (isset($block['acf_block_version'])) {
			return implode(' ', array_merge([$block['shp']['classNameBase']], $this->basicClasses($block)));
		}

		// Core block
		return implode(' ', array_merge([$block['shp']['classNameBase']], $this->basicClasses($block['attributes'])));
	}

	/**
	 * Add custom rendering data to the block
	 * Pass block by reference - no return
	 *
	 * @param array|WP_Block $block
	 * @return void
	 */
	public function extend(&$block)
	{

		// Convert object type in order to maintain extender compatibility
		// The incoming object is an array or a WP_Block, depending on whether
		// it's been registered using Core or ACF.
		$block = (array) $block;

		if (!isset($block['shp'])) {
			$block['shp'] = [];
		}

		$block['shp']['classNameBase'] = wp_get_block_default_classname($block['name']);
		$block['shp']['class_names'] = $this->classNames($block);
	}
}
