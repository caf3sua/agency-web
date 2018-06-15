(function() {
    'use strict';

    angular
        .module('app')
        .factory('OrderService', OrderService);

    OrderService.$inject = ['$resource'];
    function OrderService($resource) {
        var service = $resource('', {}, {
            'getAll' : {
                method : 'GET',
                url : 'GET /api/agency/product/order/get-alL'
            },
            'createNewPolicy' : {
                method : 'POST',
                url : 'api/agency/product/bvp/createPolicy'
            }
        });

        return service;
    }
})();
