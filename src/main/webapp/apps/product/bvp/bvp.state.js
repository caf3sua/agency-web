(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.bvp', {
            parent: 'product',
            url: '/bvp',
            templateUrl: 'apps/product/bvp/view/bvp.html',
            data: {
                authorities: [],
                title: 'PRODUCT_BVP'
            },
            controller: "ProductBvpController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/bvp/bvp.service.js', 'apps/product/bvp/bvp.controller.js']);
		        }
            }
        });
    }
})();
