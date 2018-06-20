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
            }
        });

        return service;
    }
})();
