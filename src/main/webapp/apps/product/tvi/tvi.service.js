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
                url : 'api/agency/product/tvi/premium'
            },
            'createNewPolicy' : {
                method : 'POST',
                url : 'api/agency/product/tvi/createPolicy'
            }
        });

        return service;
    }
})();