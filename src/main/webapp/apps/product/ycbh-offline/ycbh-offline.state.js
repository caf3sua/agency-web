(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.ycbh-offline', {
            parent: 'product',
            url: '/ycbh-offline',
            templateUrl: 'apps/product/ycbh-offline/ycbh-offline.html',
            data: {
                authorities: [],
                title: 'PRODUCT_YCBH_OFFLINE'
            },
            controller: "ProductYcbhOfflineController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/ycbh-offline/ycbh-offline.controller.js']);
		        }
            }
        });
    }
})();
