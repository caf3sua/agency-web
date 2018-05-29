(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProductCommonService', ProductCommonService);

    ProductCommonService.$inject = ['$resource'];

    function ProductCommonService ($resource) {
        var service = $resource('api/agency/product/', {}, {
        	'getPolicyNumber' : {
				method : 'GET',
				url : 'api/agency/common/getPolicyNumber',
				transformResponse : function(data) {
					data = angular.fromJson({
						policyNumber : data
					});
					return data;
				}
			}
        });

        return service;
    }
})();
 