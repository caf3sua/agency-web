(function() {
	'use strict';

	angular
		.module('app')
		.factory('ProductKcareService', ProductKcareService);

	ProductKcareService.$inject = [ '$resource' ];

	function ProductKcareService($resource) {
		var service = $resource('', {}, {
			'getPremium' : {
				method : 'POST',
				url : 'api/agency/product/kcare/premium'
			},
			'createPolicy' : {
				method : 'POST',
				url : 'api/agency/product/kcare/createPolicy'
			}
		});

		return service;
	}
})();