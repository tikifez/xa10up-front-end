// Entry point for the Javascript
import $ from 'jquery';

import NavControl from './nav-control';
import lazyLoad from './lazy-load';

$( () => {
	lazyLoad();
	new NavControl( '.nav-primary', '.nav-toggle', '.nav-content' );
} );
