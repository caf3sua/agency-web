(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('app.communication', {
            parent: 'app',
            url: '/communication',
            templateUrl: 'apps/communication/view/communication.html',
            data: {
                authorities: ['PERM_AGREEMENT_OFFLINE_BVP'],
                title: 'COMMUNICATION'
            },
            controller: "ProductYcbhOfflineController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/ycbh-offline/ycbh-offline.controller.js', 'apps/product/ycbh-offline/ycbh-offline.service.js']);
		        }
            }
        }) ;
    }
})();
