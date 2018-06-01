(function() {
	'use strict';

	angular
		.module('app')
		.factory('TncService', TncService);

    TncService.$inject = [ '$resource' ];

	function TncService($resource) {
		var service = $resource('', {}, {
			'getPremium' : {
				method : 'POST',
				url : 'api/agency/product/tnc/premium'
			},
			'createNewPolicy' : {
				method : 'POST',
				url : 'api/agency/product/tnc/createPolicy'
			}
		});

		return service;
	}
})();