(function() {
	'use strict';

	angular
		.module('app')
		.factory('BvpService', BvpService);

    BvpService.$inject = [ '$resource' ];

	function BvpService($resource) {
		var service = $resource('', {}, {
			'getPremium' : {
				method : 'POST',
				url : 'api/agency/product/bvp/premium'
			},
			'createNewPolicy' : {
				method : 'POST',
				url : 'api/agency/product/bvp/createPolicy'
			}
		});

		return service;
	}
})();