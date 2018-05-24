(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.home', {
            parent: 'product',
            url: '/home',
            templateUrl: 'apps/product/home/home.html',
            data: {
                authorities: [],
                title: 'PRODUCT_HOME'
            },
            controller: "ProductHomeController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/home/home.service.js', 'apps/product/home/home.controller.js']);
		        }
            }
        });
    }
})();
