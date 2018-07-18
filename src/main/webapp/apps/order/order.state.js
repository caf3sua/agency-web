(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
        $stateProvider
	        .state('app.order', {
	            parent: 'app',
	            url: '/order?page',
	            templateUrl: 'apps/order/order.html',
	            data : { 
	            	title: 'ORDER',
	            	authorities : []
	            },
	            controller: "OrderController",
	            controllerAs: 'vm',
	            params: {
	                page: {
	                    value: '1',
	                    squash: true
	                },
	                sort: {
	                    value: 'id,asc',
	                    squash: true
	                },
	                search: null
	            },
	            resolve: {
	            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
	        				$translatePartialLoader.addPart('dashboard');
	        				return $translate.refresh();
	            		}],
	            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load([
		            			'apps/order/order.service.js'
		            			, 'apps/order/order.controller.js'
		            		]);
			        }
	            }
	        })
	        .state('app.order-detail', {
	        	parent: 'app',
	            url: '/order-detail/{id}',
	            templateUrl: 'apps/order/order-detail.html',
	            data : { title: 'ORDER_DETAIL' },
	            controller: "OrderDetailController",
	            controllerAs: 'vm',
	            resolve: {
	            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
	        				$translatePartialLoader.addPart('global');
	        				return $translate.refresh();
	            		}],
//	            		entity: ['$stateParams', 'OrderService', function($stateParams, OrderService) {
//	                        return OrderService.getById({id : $stateParams.id}).$promise;
//	                    }],
	            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load(['apps/order/order.service.js', 'apps/order/order-detail.controller.js']);
			        }
	            }
	        });
    }
})();
