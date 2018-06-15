(function() {
    'use strict';

    angular
        .module('app')
        .factory('ReminderService', ReminderService)
	    .factory('ReminderCommonDialogService', ReminderCommonDialogService);
	
    ReminderCommonDialogService.$inject = ['$rootScope', '$uibModal'];

    function ReminderCommonDialogService ($rootScope, $uibModal) {
        var service = {
    		openSearchDialog: openSearchDialog,
    		openAddDialog: openAddDialog
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function openSearchDialog () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/contact/contact-search-dialog.html',
                controller: 'ContactSearchDialogController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
            
            modalInstance.result.then(function (contactObj) {
                $rootScope.selectedContact = contactObj;
                $rootScope.$broadcast('selectedContactChange');
                modalInstance = null;
              }, function () {
                console.log('Modal dismissed at: ' + new Date());
                modalInstance = null;
              });
        }
        
        function openAddDialog () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/contact/contact-add-dialog.html',
                controller: 'ContactAddDialogController',
                controllerAs: 'vm',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/contact/contact-add-dialog.controller.js']);
                    }
                }
            });
            
            modalInstance.result.then(function (contactObj) {
                $rootScope.selectedContact = contactObj;
                $rootScope.$broadcast('selectedContactChange');
                modalInstance = null;
              }, function () {
                console.log('Modal dismissed at: ' + new Date());
                modalInstance = null;
              });
        }
    }

    ReminderService.$inject = ['$resource'];
    function ReminderService ($resource) {
    	var resourceUrl =  'api/agency/contact/:id';

        return $resource(resourceUrl, {}, {
        	'search': {url : 'api/agency/contact/search', method: 'POST', isArray: true},
            'getAll': {url : 'api/agency/contact/get-all-ower', method: 'GET', isArray: true},
            'add': { method:'POST' },
            'create': {url : 'api/agency/contact/create', method: 'POST'}
        });
    }
})();


