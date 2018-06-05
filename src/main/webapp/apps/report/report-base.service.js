(function() {
	'use strict';

	angular
		.module('app')
		.factory('ReportService', ReportService);

	ReportService.$inject = [ '$resource' ];

	function ReportService($resource) {
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