(function() {
    'use strict';

    angular
        .module('app')
        .factory('DocumentService', DocumentService);

    DocumentService.$inject = ['$resource'];

    function DocumentService ($resource) {
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
