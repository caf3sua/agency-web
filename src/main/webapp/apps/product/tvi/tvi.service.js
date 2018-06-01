(function() {
    'use strict';

    angular
        .module('app')
        .factory('TviService', TviService);

    TviService.$inject = [ '$resource' ];

    function TviService($resource) {
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