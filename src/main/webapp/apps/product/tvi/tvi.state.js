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
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/tvi/tvi.controller.js']);
		        }
            }
        });
    }
})();
