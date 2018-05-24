(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.hhvc', {
            parent: 'product',
            url: '/hhvc',
            templateUrl: 'apps/product/hhvc/hhvc.html',
            data: {
                authorities: [],
                title: 'PRODUCT_HHVC'
            },
            controller: "ProductHhvcController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/hhvc/hhvc.controller.js']);
		        }
            }
        });
    }
})();
