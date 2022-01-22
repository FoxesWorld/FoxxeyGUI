	
		function formInit() {
			setTimeout(() => {
				let forms = document.querySelectorAll("form");
				if (forms.length >= 1) {
					console.log("Found forms: " + forms.length);
					forms.forEach(form => {
						form.addEventListener("submit", function(event) {
							event.preventDefault();
							let data = collectFormData(form);
							data["fname"] = form.id;
							data["sendUrl"] = form.action;
							submitForm(data, form.action, form.method);
						});
					});
				} else {
					console.warn("No forms were found!");
				}
			}, 1000);
		};
			
		function collectFormData(form) {
			let inputFields = form.querySelectorAll("input, select, textarea");
			let inputObjArr = {};
			
			inputFields.forEach(input => {
				let value;
				switch(input.type){
					case "checkbox":
						value = (input.checked) ? 1 : 0;
					break;
					
					default:
						value = (Boolean(input.value)) ? input.value : null;
					break;
				}
				inputObjArr[input.id] = value;
			});
			return inputObjArr;
		};
		
		function submitForm(data, url, method){
			let xhr = request.getXmlHttp();

			xhr.open(method, url, false);
			xhr.setRequestHeader("Content-Type", "application/json;charset-utf-8");
			xhr.send(JSON.stringify(data));
			/* Response status parsing 
				let response = JSON.parse(xhr.response); 
			*/
		}
	
