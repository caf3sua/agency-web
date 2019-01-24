(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('report.moto', {
            parent: 'report',
            url: '/reportMoto',
            templateUrl: 'apps/report/report-moto/report-moto.html',
            data: {
                authorities: ['PERM_REPORT_MOTO_VIEW'],
                title: 'REPORT_MOTO'
            },
            controller: "ReportMotoController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/report/report-moto/report-moto.controller.js', 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js', 'apps/report/report-base.service.js', 'apps/agreement-base.controller.js', 'apps/order/order.service.js']);
		        }
            }
        });
    }
})();
