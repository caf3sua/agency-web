(function() {
	'use strict';

	angular
		.module('app')
		.factory('PrintedPaperService', PrintedPaperService);

	PrintedPaperService.$inject = [ '$resource' ];

	function PrintedPaperService($resource) {
		var service = $resource('', {}, {
//			'getPremium' : {
//				method : 'POST',
//				url : 'api/agency/product/khc/premium'
//			},
//			'createNewPolicy' : {
//				method : 'POST',
//				url : 'api/agency/product/khc/createPolicy'
//			}
		});

		return service;
	}
})();