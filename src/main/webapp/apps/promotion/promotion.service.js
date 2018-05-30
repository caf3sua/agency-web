(function() {
    'use strict';

    angular
        .module('app')
        .factory('PromotionService', PromotionService);

    PromotionService.$inject = ['$resource'];

    function PromotionService ($resource) {
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
