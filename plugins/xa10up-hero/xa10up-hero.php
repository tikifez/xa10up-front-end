<?php
/**
 * Plugin Name:     XA10up Hero
 * Description:     A short topic with subitems
 * Version:         1.0.0
 * Author:          Xristopher Anderton
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     xa10up-hero
 *
 * @package         xa10up-hero
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function xa10up_hero_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "xa10up/hero" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'xa10up-hero-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'xa10up-hero-block-editor', 'xa10up-hero' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'xa10up-hero-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'xa10up-hero-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'xa10up/hero',
		array(
			'editor_script' => 'xa10up-hero-block-editor',
			'editor_style'  => 'xa10up-hero-block-editor',
			'style'         => 'xa10up-hero-block',
		)
	);
}
add_action( 'init', 'xa10up_hero_block_init' );


function xa10up_block_categories( $categories, $post ) {
    if ( $post->post_type !== 'post' ) {
        return $categories;
    }
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'xa10up',
                'title' => __( 'Xristopher Anderton 10up Samples', 'xa10up' ),
                'icon'  => 'wordpress',
            ),
        )
    );
}

add_filter( 'block_categories', 'xa10up_block_categories', 10, 2 );
