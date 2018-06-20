(function() {
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    CartService.$inject = ['$resource'];
    function CartService($resource) {
        var service = $resource('', {}, {
            'getAll' : {
                method : 'GET',
                url : 'api/agency/product/order/get-all',
                isArray : true
            },
            'getBanksByPaymentCode' : {
                method : 'GET',
                url : '/api/agency/payment/getBanksByPaymentCode',
                isArray : true
            },
            'createNewPolicy' : {
                method : 'POST',
                url : 'api/agency/product/bvp/createPolicy'
            }
        });

        return service;
    }
})();
