/**
 * Provides control over the navigation menu.
 *
 * Provides control over the navigation menu including toggles and animation.
 *
 * @link   URL TBD
 * @file   This files defines the NavControl class.
 * @author Xristopher Anderton.
 * @since  1.0.0
 */
import $ from 'jquery';

export default class NavControl {
	/**
	 * Constructs the class.
	 *
	 * @param root
	 * @param toggle
	 * @param content
	 *
	 * @since 1.0.0
	 */
	constructor( root, toggle, content ) {
		this.$root = $( root );
		this.$toggle = $( toggle );
		this.$content = $( content );
		this.durationContent = 200; // should match stylesheet transition
		this.durationToggle = 1000; // should match stylesheet transition
		this.ease = 'ease-in';

		this.init();
	}

	/**
	 * Initializes the navigation state.
	 *
	 * @since 1.0.0
	 */
	init() {
		this.$toggle.on( 'click', this.toggleMenu.bind( this ) );
		this.$content.css( 'opacity', '0.5' );
	}

	/**
	 * Toggles the menus open/close state.
	 *
	 * @since 1.0.0
	 */
	toggleMenu() {
		if ( this.$root.hasClass( 'is-active' ) ) {
			// Hide content.
			this.$content.css( 'opacity', 0 );
			setTimeout( () => {
				this.$content.css( 'display', 'none' );
				this.$root.removeClass( 'is-active' );
				this.$toggle.attr( 'aria-label', 'Open the Menu' );
			}, this.durationContent );
		} else {
			// Show content.
			this.$content.css( 'display', 'block' );
			setTimeout( () => {
				this.$content.css( 'opacity', 1 );
				this.$root.addClass( 'is-active' );
				this.$toggle.attr( 'aria-label', 'Close the Menu' );
			}, 50 );
		}
	}
}
