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
            templateUrl: 'apps/product/bvp/bvp.html',
            data: {
                authorities: [],
                title: 'PRODUCT_BVP'
            },
            controller: "ProductBvpController",
            controllerAs: 'vm',
            resolve: {
//	            	authorize: ['Auth',
//		                function (Auth) {
//		                    return Auth.authorize();
//		                }
//		            ],
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('global');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/bvp/bvp.controller.js']);
		        }
            }
        });
    }
})();
