(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.khc', {
            parent: 'product',
            url: '/khc',
            templateUrl: 'apps/product/khc/khc.html',
            data: {
                authorities: [],
                title: 'PRODUCT_KHC'
            },
            controller: "ProductKhcController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/khc/khc.controller.js']);
		        }
            }
        });
    }
})();
