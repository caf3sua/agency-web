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
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: [],
                title: 'PRODUCT_MOTO'
            },
            controller: "ProductMotoController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/moto/moto.service.js', 'apps/product/moto/moto.controller.js']);
		        }
            }
        });
    }
})();
