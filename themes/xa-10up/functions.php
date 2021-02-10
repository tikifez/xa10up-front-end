<?php
/**
 * Theme support
 */

add_theme_support( 'custom-logo', array(
	'flex-height' => true,
	'flex-width'  => true,
	'header-text' => array( 'site-title', 'site-description' ),
	'height'      => 100,
	'width'       => 400,
) );
add_theme_support( 'title-tag' );

/**
 * Register Menus
 */
function register_primary_nav() {
	register_nav_menu( 'primary-nav', __( 'Primary Nav' ) );
}

add_action( 'init', 'register_primary_nav' );

/**
 * Enqueue theme assets
 */
function xa_10up_enqueue_assets() {
	wp_enqueue_style( 'theme-style', get_stylesheet_directory_uri() . '/build/styles/style.css', false );
	wp_enqueue_script( 'theme-js', get_template_directory_uri() . '/build/scripts/bundle.js', [ 'jquery' ] );
}

add_action( 'wp_enqueue_scripts', 'xa_10up_enqueue_assets' );

/**
 * Theme customizer
 */
function za_10up_customize_register( $wp_customize ) {

	$wp_customize->add_setting( 'xa_10up_logo', array(
		'default'           => get_theme_file_uri( 'assets/icons/site-logo.svg' ),
		'sanitize_callback' => 'esc_url_raw'
	) );

	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'xa_10up_logo_control', array(
		'label'         => 'Upload Logo',
		'priority'      => 20,
		'section'       => 'title_tagline',
		'settings'      => 'diwp_logo',
		'button_labels' => array(// All These labels are optional
			'select' => 'Select Logo',
			'remove' => 'Remove Logo',
			'change' => 'Change Logo',
		)
	) ) );
}

add_action( 'customize_register', 'xa_10up_customize_register' );
