(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.tvc', {
            parent: 'product',
            url: '/tvc',
            templateUrl: 'apps/product/tvc/tvc.html',
            data: {
                authorities: [],
                title: 'PRODUCT_TVC'
            },
            controller: "ProductTvcController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/tvc/tvc.controller.js']);
		        }
            }
        });
    }
})();
