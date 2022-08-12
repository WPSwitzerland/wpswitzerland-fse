<?php

/**
 * Title: Page Header
 * Slug: sht/page-header
 * Block Types: page
 */

$image_url = get_template_directory_uri() . '/assets/img/default-image.jpg';
?>

<!-- wp:cover {"url":"<?php echo $image_url; ?>","dimRatio":90,"focalPoint":{"x":"0.50","y":"0.50"},"gradient":"wordpress-blue","contentPosition":"bottom left","align":"full"} -->
<div class="wp-block-cover alignfull has-custom-content-position is-position-bottom-left"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-90 has-background-dim wp-block-cover__gradient-background has-background-gradient has-wordpress-blue-gradient-background"></span><img class="wp-block-cover__image-background" alt="" src="<?php echo $image_url; ?>" style="object-position:50% 50%" data-object-fit="cover" data-object-position="50% 50%" />
	<div class="wp-block-cover__inner-container">
		<!-- wp:group {"layout":{"inherit":true}} -->
		<div class="wp-block-group">
			<!-- wp:post-title {"level":1,"align":"wide","textColor":"white"} /-->
		</div>
		<!-- /wp:group -->
	</div>
</div>
<!-- /wp:cover -->
