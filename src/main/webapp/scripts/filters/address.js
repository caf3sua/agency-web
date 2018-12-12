(function() {
    'use strict';
    angular
		.module('app')
		.filter('address', address)
		.filter('shortAddress', shortAddress);

		function address() {
		    return function(address) {
		    	if (address == undefined || address == null) {
		    		return "";
		    	}
		    	
		    	if (address.lastIndexOf('::') == -1) {
		    		return address;
		    	}
		    	
		    	let addressExcludePostcode = address.substring(0, address.lastIndexOf('::'));
		    	addressExcludePostcode = addressExcludePostcode.split('::').join(", ");
		    	return addressExcludePostcode;
		    }
		}
		
		function shortAddress() {
		    return function(address) {
		    	if (address == undefined || address == null) {
		    		return "";
		    	}
		    	
		    	if (address.lastIndexOf('::') == -1) {
		    		return address;
		    	}
		    	
		    	return address.substring(0, address.indexOf('::'));
		    }
		}
})();
