(function() {
    'use strict';

    angular
        .module('app')
        .factory('PrintedPaperService', PrintedPaperService);

    PrintedPaperService.$inject = ['$resource'];
    function PrintedPaperService($resource) {
        var service = $resource('', {}, {
            'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/getAnchi-by-gycbhNumber'
            }
        });

        return service;
    }
})();
