(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.car', {
            parent: 'product',
            url: '/car',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/product/car/car.html',
                    controller: 'ProductCarController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();d
                }]
            }
        });
    }
})();
