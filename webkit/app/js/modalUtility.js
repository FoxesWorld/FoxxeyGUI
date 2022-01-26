function appendModal(modal){
	let baseContent = '<aside id="settings" class="foxmdl-popup" tabindex="-1">' +
			'<i class="fa fa-times closeButt" onclick="FoxMdl.hide();" aria-hidden="true"></i>' +
			'<main class="foxMdlMain">' +
				'<header>' +
					'<h2></h2>' +
				'</header>' +
				'<content>' +
				'</content>' +
				'<footer>' +
					'<!-- <button class="butt" onclick="FoxMdl.hide();">Close</button> -->' +
				'</footer>' +
			'</main>' +
		'</aside>';
	let modalContent = new DOMParser().parseFromString(getHTMLcontent(modal), "text/xml");
	
	return modalContent;
}