(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.bvStep', {
            parent: 'product',
            url: '/bvStep',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/product/bvStep/bvStep.html',
                    controller: 'BvStepController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
