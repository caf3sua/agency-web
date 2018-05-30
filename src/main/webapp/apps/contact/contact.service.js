(function() {
    'use strict';

    angular
        .module('app')
        .factory('ContactService', ContactService);

    ContactService.$inject = ['$resource'];

    function ContactService ($resource) {
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
