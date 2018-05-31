(function() {
    'use strict';

    angular
        .module('app')
        .factory('ContactService', ContactService)
	    .factory('ContactSearchDialogService', ContactSearchDialogService);
	
    ContactSearchDialogService.$inject = ['$rootScope', '$uibModal'];

    function ContactSearchDialogService ($rootScope, $uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/contact/contact-search-dialog.html',
                controller: 'ContactSearchDialogController',
                controllerAs: 'vm',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
            
            modalInstance.result.then(function (contactCode) {
                console.log(contactCode);
                $rootScope.selectedContactCode = contactCode;
                $rootScope.$broadcast('contactCodeChange', {data: contactCode});
                modalInstance = null;
              }, function () {
                console.log('Modal dismissed at: ' + new Date());
                modalInstance = null;
              });
        }
    }

    ContactService.$inject = ['$resource'];
    function ContactService ($resource) {
    	var resourceUrl =  'api/devices/:id';

        return $resource(resourceUrl, {}, {
        	'search': {url : 'api/devices-search-on-grid', method: 'POST', isArray: true},
            'getAll': {url : 'api/devices-search-on-grid', method: 'GET', isArray: true},
            'add': { method:'PUT' }
        });
    }
})();


