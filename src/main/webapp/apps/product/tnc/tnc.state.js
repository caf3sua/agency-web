(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.tnc', {
            parent: 'product',
            url: '/tnc',
            templateUrl: 'apps/product/tnc/tnc.html',
            data: {
                authorities: [],
                title: 'PRODUCT_TNC'
            },
            controller: "ProductTncController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/tnc/tnc.service.js','apps/product/tnc/tnc.controller.js']);
		        }
            }
        });
    }
})();
