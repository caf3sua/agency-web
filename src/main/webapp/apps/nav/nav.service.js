(function() {
	'use strict';

	angular
		.module('app')
		.factory('NavCommonService', NavCommonService);

	NavCommonService.$inject = [ '$resource' ];

	function NavCommonService($resource) {
		var service = $resource('', {}, {
			'getKcarePremium' : {
				method : 'POST',
				url : 'api/agency/product/kcare/premium'
			},
			'getCarPremium' : {
				method : 'POST',
				url : 'api/agency/product/car/premium'
			}
		});

		return service;
	}
})();