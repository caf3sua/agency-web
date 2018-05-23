(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.moto', {
            parent: 'product',
            url: '/moto',
            templateUrl: 'apps/product/moto/moto.html',
            data: {
                authorities: [],
                title: 'PRODUCT_MOTO'
            },
            controller: "ProductMotoController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/moto/moto.controller.js']);
		        }
            }
        });
    }
})();
