(function() {
	'use strict';

	angular
		.module('app')
		.factory('MotoService', MotoService);

    MotoService.$inject = [ '$resource' ];

	function MotoService($resource) {
		var service = $resource('', {}, {
			'getPremium' : {
				method : 'POST',
				url : 'api/agency/product/moto/premium'
			},
			'createNewPolicy' : {
				method : 'POST',
				url : 'api/agency/product/moto/createPolicy'
			}
		});

		return service;
	}
})();