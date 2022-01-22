function request(path, args, timeDelay) {
	
	this.path = path;
	this.args = args;
	this.timeDelay = timeDelay;
	this.timeDelay_time = 0;
	this.timeDelay_maxCount = 3;
	this.timeDelay_count = 0;
	
	this.send_post = function(params, after, antitimeDelay) {
		
		if(this.timeDelay != false && antitimeDelay == null /*&& this.timeDelay_count ++ == this.timeDelay_maxCount*/){
			let time = new Date().getTime();
			let time_ = time - this.timeDelay_time;

			if(time_ < this.timeDelay){
				return after({status: "error", message: "Please wait for "+ ((this.timeDelay - time_) / 1000 + 1).toFixed(0) +" seconds..."});
			} else this.timeDelay_time = time;
			this.timeDelay_count = 0;
		}

		xmlhttp = this.getXmlHttp();
		xmlhttp.open('POST', this.path, true);
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
				if(xmlhttp.responseText) {
					after(xmlhttp.responseText);
					/*
					if(xmlhttp.responseText.charAt(0) == '{'){
						after(JSON.parse(xmlhttp.responseText));
					} else {
						after({status: "error", message: xmlhttp.responseText});
					} */
				}
		};
		
		let p = '';
		for (let key in params) {
			p += key + '=' + params[key] + '&';
		}
		for (let key in args) {
			p += key + '=' + args[key] + '&';
		}
		xmlhttp.send(p.slice(0,-1));
	};
	
	this.sendGet = function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	};
	
	this.upload = function( file, params, progress, load){
		
		let xhr = this.getXmlHttp();
		let formData = new FormData();
		
		formData.append("file", file);
		for (let key in params) {
			formData.append(key, params[key]);
		}
		for (let key in args) {
			formData.append(key, args[key]);
		}
		
		xhr.upload.onprogress = function(event) {
			progress(event);
		}

		xhr.onload = xhr.onerror = function() {
			load(this);
		};

		xhr.open('POST', this.path, true);
		xhr.send(formData);
	};
	
	this.getXmlHttp = function() {
		let xmlhttp;
		
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
				xmlhttp = false;
			}
		}
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
			xmlhttp = new XMLHttpRequest();
		}
		return xmlhttp;
	}
};