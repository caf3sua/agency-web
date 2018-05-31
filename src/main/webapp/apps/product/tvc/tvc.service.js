(function() {
    'use strict';

    angular
        .module('app')
        .factory('TvcService', TvcService);

    TvcService.$inject = [ '$resource' ];

    function TvcService($resource) {
        var service = $resource('', {}, {
            'getPremium' : {
                method : 'POST',
                url : 'api/agency/product/tvc/premium'
            },
            'createNewPolicy' : {
                method : 'POST',
                url : 'api/agency/product/tvc/createPolicy'
            }
        });

        return service;
    }
})();