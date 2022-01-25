	(function () {
		request = new request('', {key:"secureKey"}, 'false');
	 }());
	 
	 function appendCss() {
		 let css = JSON.parse(getHTMLcontent('app/css'));
		 console.log("Adding "+ css.length + " App/CSS files");
		 for (var value of css) {
			 $('head').append('<link href="/app/css/'+ value + '" rel="stylesheet">');
		 }
	 }

	function addAnimation(animation, block) {
			block.addClass(animation);
			 setTimeout(() => {
				block.removeClass(animation);
			 }, 1000);
	}
				
	function loadPage(page) {
		addAnimation('animate__backOutRight', $('#mainCont'));
		setTimeout(() => {
			app.content = getHTMLcontent('pages/'+page);
				formInit();
				selListFunc();
		}, 1000);
		setTimeout(() => {
			addAnimation('animate__bounceInDown', $('#mainCont'));
		}, 1000);
	}
	
	function getHTMLcontent(file) {
		let content = request.sendGet(file); 
		return content;
	}
					
	function serversLoad() {
		console.log('Loading '+ servers.length + ' servers');
		for (var value of servers) {
			let newSrv = '<div class="option" data-select-val="'+ value +'">'+ value +'</div>';
			$("#srvList").append(newSrv);
		}
	}
	
	function selListFunc() {
		setTimeout(() => {
			if($(".select").length > 0) {
				serversLoad();
				console.log("SelectList listener enabled");
				let optList = ".option-list";
				$('.selected').click(function(){
					$(optList).slideToggle(200);
					$('.select').toggleClass('select-active');
				if ($(optList).is(':visible')) {
				   $(optList).css('display','grid');
				}
				});

				$('.option').click(function(){
					select_val = $(this).attr('data-select-val');
					select_div = $(this).parent().parent();
					$(select_div).children('.selected').html($(this).html());
					$(select_div).children('input').val(select_val);

					$(optList).slideToggle(200);
					$('.select').toggleClass('select-active');
				});
			} else {
				console.warn("No SelList element!");
			}
		}, 1000);
	}
	
	/* DEVELOPMENT */
	
	function parsePages() {
		let indexPages = JSON.parse(request.sendGet('pages'));
		for (var value of indexPages) {
			if(value.toLowerCase().indexOf('.html'.toLowerCase())) {
				$('#pagesAvialable').append(
					$('<input>').prop({
						type: 'radio',
						id: value,
						name: 'tplSel',
						value: value
					})
				).append(
					$('<label>').prop({
						for: value
					}).html(value)
				).append('<br />')
			}
		}
	};