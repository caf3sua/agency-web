(function() {
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    CartService.$inject = ['$resource'];

    function CartService ($resource) {
        var service = $resource('api/account', {}, {
            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        return response;
                    }
                }
            }        
        });

        return service;
    }
})();
