(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.ycbh-offline', {
            parent: 'product',
            url: '/ycbh-offline',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/product/ycbh-offline/ycbh-offline.html',
                    controller: 'ProductYcbhOfflineController',
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
