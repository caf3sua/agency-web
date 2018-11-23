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