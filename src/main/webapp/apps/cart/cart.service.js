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
                url : 'api/agency/product/agreement/get-cart',
                isArray : true
            },
            'getBanksByPaymentCode' : {
                method : 'GET',
                url : 'api/agency/payment/getBanksByPaymentCode/:id',
                isArray : false
            },
            'createNewPolicy' : {
                method : 'POST',
                url : 'api/agency/product/bvp/createPolicy'
            }
        });

        return service;
    }
})();
