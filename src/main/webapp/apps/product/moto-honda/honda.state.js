(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.honda', {
            parent: 'product',
            url: '/honda?id&copy&selContactId',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: ['PERM_PRODUCT_MOT_CREATE'],
                title: 'PRODUCT_MOTO'
            },
            controller: "ProductMotoHondaController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/moto-honda/honda.controller.js']);
		        }
            }
        });
    }
})();
