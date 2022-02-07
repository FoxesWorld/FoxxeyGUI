
var FoxMdl = (function(){

	let container = document.documentElement,
		popup = document.querySelector('.foxmdl-popup-animate'),
		cover = document.querySelector('.foxmdl-cover'),
		currentState = null;

	container.classList.add('foxmdl-ready');

	// Deactivate on ESC
	function onDocumentKeyUp(event) {
		if(event.keyCode === 27) {
			deactivate();
		}
	}

	// Deactivate on click outside
	function onDocumentClick(event) {
		if(event.target === cover) {
			deactivate();
		}
	}

	function activate(state) {

		document.addEventListener('keyup', onDocumentKeyUp, false);
		document.addEventListener('click', onDocumentClick, false);
		document.addEventListener('touchstart', onDocumentClick, false);

		popup.classList.remove(currentState);
		popup.classList.add('no-transition');
		if(state)
			popup.classList.add(state);

		setTimeout(function() {
			popup.classList.remove('no-transition');
			container.classList.add('foxmdl-active');
		}, 0);

		currentState = state;

	}

	function deactivate() {
		document.removeEventListener('keyup', onDocumentKeyUp, false);
		document.removeEventListener('click', onDocumentClick, false);
		document.removeEventListener('touchstart', onDocumentClick, false);
		container.classList.remove('foxmdl-active');
		popup.classList.remove('foxmdl-popup-animate');

	}

	function show(selector) {
		let fName = selector.replace('#', "");
		formInit(100);
		console.log('Showing ' + selector);
		if($(selector).length <= 0) { 
			$('.loadedPage').append(modalFill(fName));
		}
		popup = document.querySelector(selector);
		popup.classList.add('foxmdl-popup-animate');
		activate();
		return this;
	}
	
	function modalFill(mdlName){
		let modalFile = getHTMLcontent('modal/'+mdlName+'.html');
		let modalContent = '<aside id="'+mdlName+'" class="foxmdl-popup" tabindex="-1">' +
			'<i class="fa fa-times closeButt" onclick="FoxMdl.hide();" aria-hidden="true"></i>' +
			'<main class="foxMdlMain">' +
				'<content>' +
				modalFile +
				'</content>' +
				'<footer>' +
					'<!-- <button class="butt" onclick="FoxMdl.hide();">Close</button> -->' +
				'</footer>' +
			'</main>' +
		'</aside>';
		
		return modalContent;
	}

	function hide() {
		deactivate();
	}

	return {
		activate: activate,
		deactivate: deactivate,
		show: show,
		hide: hide
	}

})();
