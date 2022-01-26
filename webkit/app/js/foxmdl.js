
var FoxMdl = (function(){

	var container = document.documentElement,
		popup = document.querySelector( '.foxmdl-popup-animate' ),
		cover = document.querySelector( '.foxmdl-cover' ),
		currentState = null;

	container.classList.add( 'foxmdl-ready' );

	// Deactivate on ESC
	function onDocumentKeyUp( event ) {

		if( event.keyCode === 27 ) {
			deactivate();
		}

	}

	// Deactivate on click outside
	function onDocumentClick( event ) {

		if( event.target === cover ) {
			deactivate();
		}

	}

	function activate( state ) {

		document.addEventListener( 'keyup', onDocumentKeyUp, false );
		document.addEventListener( 'click', onDocumentClick, false );
		document.addEventListener( 'touchstart', onDocumentClick, false );

		popup.classList.remove( currentState );
		popup.classList.add( 'no-transition' );
		if(state)
			popup.classList.add( state );

		setTimeout( function() {
			popup.classList.remove( 'no-transition' );
			container.classList.add( 'foxmdl-active' );
		}, 0 );

		currentState = state;

	}

	function deactivate() {

		document.removeEventListener( 'keyup', onDocumentKeyUp, false );
		document.removeEventListener( 'click', onDocumentClick, false );
		document.removeEventListener( 'touchstart', onDocumentClick, false );

		container.classList.remove( 'foxmdl-active' );
		popup.classList.remove( 'foxmdl-popup-animate' );

	}

	function disableBlur() {

		document.documentElement.classList.add( 'no-blur' );

	}

	function show( selector ) {

		popup = document.querySelector( selector );
		popup.classList.add( 'foxmdl-popup-animate' );
		activate();
		return this;

	}

	function hide() {

		deactivate();

	}

	return {

		activate: activate,
		deactivate: deactivate,
		disableBlur: disableBlur,
		show: show,
		hide: hide

	}

})();
