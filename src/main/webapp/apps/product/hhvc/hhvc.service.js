(function() {
	'use strict';

	angular
		.module('app')
		.factory('HhvcService', HhvcService);

    HhvcService.$inject = [ '$resource' ];

	function HhvcService($resource) {
		var service = $resource('', {}, {
			'getPremium' : {
				method : 'POST',
				url : 'api/agency/product/hhvc/premium'
			},
			'createNewPolicy' : {
				method : 'POST',
				url : 'api/agency/product/hhvc/createPolicy'
			}
		});

		return service;
	}
})();