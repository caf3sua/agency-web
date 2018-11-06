(function() {
    'use strict';

    angular
        .module('app')
        .factory('CommunicationService', CommunicationService);

    CommunicationService.$inject = ['$resource'];
    function CommunicationService($resource) {
        var service = $resource('', {}, {
            'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/get-by-gycbhNumber'
            },
            'saveCommunication': {url : 'api/agency/common/createCommunication', method: 'POST'}
        });

        return service;
    }
})();
