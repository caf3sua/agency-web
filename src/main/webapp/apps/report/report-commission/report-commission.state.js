(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('report.commission', {
            parent: 'report',
            url: '/commission',
            templateUrl: 'apps/report/report-commission/report-commission.html',
            data: {
                authorities: [],
                title: 'REPORT_COMMISSION'
            },
            controller: "ReportCommissionController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/report/report-commission/report-commission.controller.js']);
		        }
            }
        });
    }
})();
