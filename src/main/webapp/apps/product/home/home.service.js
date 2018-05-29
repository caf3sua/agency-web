(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProductHomeService', ProductHomeService);

    ProductHomeService.$inject = ['$resource'];

    function ProductHomeService ($resource) {
        var service = $resource('api/agency/product/home', {}, {
            'getPremium': {url: 'api/agency/product/home/premium', method: 'POST', isArray: false},
            'createPolicy': {url: 'api/agency/product/home/createPolicy',  method:'POST'},
            'updatePolicy': {url: 'api/agency/product/home/updatePolicy',  method:'POST' }
        });

        return service;
    }
})();
 