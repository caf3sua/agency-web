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
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/product/car/car.service.js', 'apps/product/car/car.controller.js']);
                }
            }
        });
    }
})();
