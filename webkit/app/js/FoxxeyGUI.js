	(function () {
		request = new request('', {key:"secureKey"}, 'false');
	 }());

	 function appendJs() {
		 let js = JSON.parse(getHTMLcontent('app/js'));
		 console.log("Adding "+ js.length + " App/JS files");
		 for (var value of js) {
			 $('head').append('<script src="/app/js/'+ value + '"></script>');
		 }
	 }
	 
	 function appendCss() {
		 let css = JSON.parse(getHTMLcontent('app/css'));
		 console.log("Adding "+ css.length + " App/CSS files");
		 for (var value of css) {
			 $('head').append('<link href="/app/css/'+ value + '" rel="stylesheet">');
		 }
	 }
	 
	 function vkFill(){
		if($("#"+vkBlock).length > 0) {
			VK.Widgets.Group(vkBlock, {mode: 4, width: "min-content", height: "462", color1: '573f26', color2: 'dce5f4', color3: '12669F'}, 168368623);
		}
	 }

	function addAnimation(animation, block) {
			block.addClass(animation);
			 setTimeout(() => {
				block.removeClass(animation);
			 }, 1000);
	}
	
	function progressBarFilling(progress){
		
		for (let ammount = 0; ammount <= 100; ammount++) {
			$("#"+progress).css("width", ammount + "%");
		}
	}
				
	function loadPage(page) {
		addAnimation('animate__backOutRight', $('#mainCont'));
		setTimeout(() => {
			app.content = getHTMLcontent('pages/'+page);
				checkAuthorisation();
				formInit(1000);
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
		for (var row of servers) {
			let newSrv = '<div class="option" data-select-val="'+ row.srvName +'">'+
				 '<h4>'+row.srvName+'</h4>' +
				 '<span>'+ row.srvVer+'</span>'+
			'</div>';
			$("#srvList").append(newSrv);
		}
	}
	
	function selListFunc() {
		setTimeout(() => {
			let selectedSrv = $("#selectedSrv").val();
			if($(".select").length > 0) {
				serversLoad();
				console.log("SelectList listener enabled");
				$(".selected").html(selectedSrv);
				let optList = ".option-list";
				$('.selected').click(function(){
					$(optList).slideToggle(200);
					$('.select').toggleClass('select-active');
				if ($(optList).is(':visible')) {
				   $(optList).css('display','grid');
				}
				});
				
				$(".option").hover(function(){
					$("#srvInfo").html(($(this).attr('data-select-val') + " info got from backend!"));
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
			vkFill();
		}, 500);
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