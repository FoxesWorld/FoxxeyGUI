function checkAuthorisation(){
	if(isLogged) {
		//console.log('User login is - ' + userData.login);
		setTimeout(() => {
			setUserData();
		}, 100);
	} else {
		console.warn("User not authorised!");
	}
}

function setUserData(){
	for (let row of userData) {
		if($("#"+row.title).length > 0) {
			switch(row.type){
				case 'text':
					$('#'+row.title).html(row.value);
				break;
				
				case 'input':
					$('#'+row.title).val(row.value);
				break;
			}
		} else {
			console.warn('Element '+ row.title + ' was not inserted!');
		}
	}
}