(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.kcare', {
            parent: 'product',
            url: '/kcare',
            templateUrl: 'apps/product/kcare/kcare.html',
            data: {
                authorities: [],
                title: 'PRODUCT_KCARE'
            },
            controller: "ProductKcareController",
            controllerAs: 'vm',
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/product/kcare/kcare.service.js', 'apps/product/kcare/kcare.controller.js']);
                }
            }
        });
    }
})();
