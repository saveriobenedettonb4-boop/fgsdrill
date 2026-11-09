/**
 * NB Hotspot Map.
 * Hover works in CSS; this adds: tap/click to open a card (touch screens), Esc and
 * outside click to close, hovering a coloured nation opens its card (and hovering a
 * card highlights its nation), cards kept inside the map.
 */
( function () {
	'use strict';

	function init( root ) {
		if ( ! root || root.dataset.nbmReady ) {
			return;
		}
		root.dataset.nbmReady = '1';

		var stage = root.querySelector( '.nbm-stage' );
		var land = root.querySelector( '.nbm-land' );
		var spots = Array.prototype.slice.call( root.querySelectorAll( '.nbm-spot' ) );

		function nation( spot ) {
			return land.querySelector( '[data-iso="' + spot.dataset.iso + '"]' );
		}

		function active( spot, on ) {
			var n = nation( spot );
			if ( n ) {
				n.classList.toggle( 'is-active', on );
			}
		}

		// Keep top/bottom cards inside the map horizontally.
		function fit( spot ) {
			var card = spot.querySelector( '.nbm-card' );
			if ( spot.classList.contains( 'nbm-pos-left' ) || spot.classList.contains( 'nbm-pos-right' ) ) {
				return;
			}
			card.style.setProperty( '--dx', '0px' );
			var c = card.getBoundingClientRect();
			var s = stage.getBoundingClientRect();
			var dx = c.left < s.left ? s.left - c.left : ( c.right > s.right ? s.right - c.right : 0 );
			card.style.setProperty( '--dx', dx + 'px' );
		}

		function close( except ) {
			spots.forEach( function ( s ) {
				if ( s !== except && s.classList.contains( 'is-open' ) ) {
					s.classList.remove( 'is-open' );
					s.querySelector( '.nbm-dot' ).setAttribute( 'aria-expanded', 'false' );
					active( s, false );
				}
			} );
		}

		spots.forEach( function ( spot ) {
			var dot = spot.querySelector( '.nbm-dot' );
			spot.addEventListener( 'mouseenter', function () {
				fit( spot );
				active( spot, true );
			} );
			spot.addEventListener( 'mouseleave', function () {
				if ( ! spot.classList.contains( 'is-open' ) ) {
					active( spot, false );
				}
			} );
			spot.addEventListener( 'focusin', function () {
				fit( spot );
				active( spot, true );
			} );
			dot.addEventListener( 'click', function ( e ) {
				e.stopPropagation();
				var open = ! spot.classList.contains( 'is-open' );
				close( spot );
				spot.classList.toggle( 'is-open', open );
				dot.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
				fit( spot );
				active( spot, open );
			} );
		} );

		// Hovering a coloured nation opens the card of its hotspot.
		var near = null;
		land.addEventListener( 'mouseover', function ( e ) {
			var iso = e.target.getAttribute && e.target.getAttribute( 'data-iso' );
			var spot = iso ? root.querySelector( '.nbm-spot[data-iso="' + iso + '"]' ) : null;
			if ( spot === near ) {
				return;
			}
			if ( near ) {
				near.classList.remove( 'is-near' );
			}
			near = spot;
			if ( spot ) {
				fit( spot );
				spot.classList.add( 'is-near' );
			}
		} );
		land.addEventListener( 'mouseleave', function () {
			if ( near ) {
				near.classList.remove( 'is-near' );
				near = null;
			}
		} );

		document.addEventListener( 'click', function ( e ) {
			if ( root.isConnected && ! ( e.target.closest && e.target.closest( '.nbm-card' ) ) ) {
				close( null );
			}
		} );
		document.addEventListener( 'keydown', function ( e ) {
			if ( 'Escape' === e.key && root.isConnected ) {
				close( null );
			}
		} );
	}

	function initAll( scope ) {
		Array.prototype.forEach.call( ( scope || document ).querySelectorAll( '.nbm' ), init );
	}

	window.NBHotspotMap = { init: init, initAll: initAll };

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', function () {
			initAll();
		} );
	} else {
		initAll();
	}

	function hookElementor() {
		window.elementorFrontend.hooks.addAction( 'frontend/element_ready/nb-hotspot-map.default', function ( $scope ) {
			initAll( $scope[ 0 ] );
		} );
	}
	if ( window.elementorFrontend && window.elementorFrontend.hooks ) {
		hookElementor();
	} else if ( window.jQuery ) {
		window.jQuery( window ).on( 'elementor/frontend/init', hookElementor );
	}
}() );
