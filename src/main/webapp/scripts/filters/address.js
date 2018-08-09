(function() {
    'use strict';
    angular
		.module('app')
		.filter('address', address);

		function address() {
		    return function(address) {
		    	if (address == undefined || address == null) {
		    		return "";
		    	}
		    	let addressExcludePostcode = address.substring(0, address.lastIndexOf('::'));
		    	addressExcludePostcode = addressExcludePostcode.split('::').join(", ");
		    	return addressExcludePostcode;
		    }
		}
})();
