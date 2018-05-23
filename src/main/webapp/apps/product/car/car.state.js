(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.car', {
            parent: 'product',
            url: '/car',
            templateUrl: 'apps/product/car/car.html',
            data: {
                authorities: [],
                title: 'PRODUCT_CAR'
            },
            controller: "ProductCarController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/car/car.controller.js']);
		        }
            }
        });
    }
})();
