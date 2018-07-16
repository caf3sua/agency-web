(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
    	$stateProvider.state('report.transfer', {
            parent: 'report',
            url: '/transfer',
            templateUrl: 'apps/report/report-transfer/report-transfer.html',
            data: {
                authorities: [],
                title: 'REPORT_TRANSFER'
            },
            controller: "ReportTransferController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/report/report-transfer/report-transfer.controller.js']);
		        }
            }
        });
    }
})();
