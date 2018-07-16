(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.khc', {
            parent: 'product',
            url: '/khc?id',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: [],
                title: 'PRODUCT_KHC'
            },
            controller: "ProductKhcController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/khc/khc.controller.js']);
		        }
            }
        });
    }
})();
