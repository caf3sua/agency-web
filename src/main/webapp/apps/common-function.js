function isNotEmptyString(str) {
	if (str == null || str == undefined || str == "") {
		return false;	
	}
	
	return true;
}

function isEmptyString(str) {
	if (str == null || str == undefined || str == "") {
		return true;	
	}
	
	return false;
}

function generateId() {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < 8; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
}