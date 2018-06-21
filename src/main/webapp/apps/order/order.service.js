(function() {
    'use strict';

    angular
        .module('app')
        .factory('OrderService', OrderService);

    OrderService.$inject = ['$resource'];
    function OrderService($resource) {
        var service = $resource('', {}, {
        	'search' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order',
                isArray : true
            }
        });

        return service;
    }
})();
