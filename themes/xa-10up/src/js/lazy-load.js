/**
 * Lazy loads images
 *
 * Lazy load images which are not in the first child of the main tag.
 *
 * @link   URL TBD
 * @author Xristopher Anderton.
 * @since  1.0.0
 */
export default function lazyLoad() {
	document.addEventListener( 'DOMContentLoaded', function () {
		// Lazy load images which aren't in the first child of the main element.
		const lazyloadImages = document.querySelectorAll(
			'main :not( main + *) img'
		);
		let lazyloadThrottleTimeout;

		/**
		 * Lazy loads the images
		 *
		 * @since 1.0.0
		 */
		function lazyload() {
			if ( lazyloadThrottleTimeout ) {
				clearTimeout( lazyloadThrottleTimeout );
			}

			lazyloadThrottleTimeout = setTimeout( function () {
				const scrollTop = window.pageYOffset;
				lazyloadImages.forEach( function ( img ) {
					if ( img.offsetTop < window.innerHeight + scrollTop ) {
						img.src = img.dataset.src;
						img.classList.remove( 'lazy' );
					}
				} );
				if ( lazyloadImages.length === 0 ) {
					document.removeEventListener( 'scroll', lazyload );
					window.removeEventListener( 'resize', lazyload );
					window.removeEventListener( 'orientationChange', lazyload );
				}
			}, 20 );
		}

		document.addEventListener( 'scroll', lazyload );
		window.addEventListener( 'resize', lazyload );
		window.addEventListener( 'orientationChange', lazyload );
	} );
}
