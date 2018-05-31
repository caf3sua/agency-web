(function() {
	'use strict';

	angular
		.module('app')
		.factory('KhcService', KhcService);

    KhcService.$inject = [ '$resource' ];

	function KhcService($resource) {
		var service = $resource('', {}, {
			'getPremium' : {
				method : 'POST',
				url : 'api/agency/product/khc/premium'
			},
			'createNewPolicy' : {
				method : 'POST',
				url : 'api/agency/product/khc/createPolicy'
			}
		});

		return service;
	}
})();