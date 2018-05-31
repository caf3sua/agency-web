(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.tvi', {
            parent: 'product',
            url: '/tvi',
            templateUrl: 'apps/product/tvi/tvi.html',
            data: {
                authorities: [],
                title: 'PRODUCT_TVI'
            },
            controller: "ProductTviController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/tvi/tvi.controller.js']);
		        }
            }
        });
    }
})();
