(function() {
    'use strict';

    angular
        .module('app')
        .factory('OrderService', OrderService);

    OrderService.$inject = ['$resource'];
    function OrderService($resource) {
        var service = $resource('', {}, {
        	'createNophi' : {
                method : 'POST',
                url : 'api/agency/product/agreement/create-agreement-nophi'
            },
        	'createTaituc' : {
                method : 'GET',
                url : 'api/agency/product/agreement/create-agreement-taituc/:agreementId'
            },
        	'search' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order',
                isArray : true
            },
            'getById' : {
                method : 'GET',
                url : 'api/agency/product/agreement/get-by-id/:id'
            },
            'getByContactCode' : {
                method : 'POST',
                url : 'api/agency/contact/get-by-code'
            },
            'cancelOrder' : {
                method : 'POST',
                url : 'api/agency/product/agreement/cancel'
            },
            'resendEmail' : {
                method : 'POST',
                url : 'api/agency/product/agreement/resend-confirm-email'
            },
            'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/get-by-gycbhNumber'
            }
        });

        return service;
    }
})();
