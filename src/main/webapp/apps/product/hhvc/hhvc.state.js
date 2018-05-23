(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.hhvc', {
            parent: 'product',
            url: '/hhvc',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/product/hhvc/hhvc.html',
                    controller: 'ProductHhvcController',
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
