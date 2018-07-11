(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.printed-paper', {
            parent: 'product',
            url: '/printed-paper/{productCode}',
            templateUrl: 'apps/product/printed-paper/view/printed-paper.html',
            data: {
                authorities: [],
                title: 'PRODUCT_PRINTED_PAPER'
            },
            controller: "ProductPrintedPaperController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/printed-paper/printed-paper.controller.js']);
		        }
            }
        });
    }
})();
