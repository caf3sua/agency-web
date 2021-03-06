(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.car', {
            parent: 'product',
            url: '/car?id&copy&selContactId',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: ['PERM_PRODUCT_CAR_CREATE'],
                title: 'PRODUCT_CAR'
            },
            controller: "ProductCarController",
            controllerAs: 'vm',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/product/car/car.controller.js', 'apps/product/car/car-update.controller.js']);
                }
            }
        });
    }
})();
