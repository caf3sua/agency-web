(function() {
	'use strict';

	angular
		.module('app')
		.factory('ReportService', ReportService);

	ReportService.$inject = [ '$resource' ];

	function ReportService($resource) {
		var service = $resource('', {}, {
			'getCountAllOrder' : {
				method : 'GET',
				url : 'api/agency/agency-report/get-count-all-order',
				isArray : false
			},
			'getReportTransfer' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-transfer',
				isArray : true
			},
			'getReportIncome' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-income'
			},
			'getReportDashboard' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-dashboard'
			},
			'getReportCommission' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-commission'
			},
			'getReportHistoryPurchase' : {
				method : 'GET',
				url : 'api/agency/agency-report/report-history-purchase/:contactId',
				isArray: true
			},
			'getReportHistoryLoss' : {
				method : 'GET',
				url : 'api/agency/agency-report/report-history-loss/:contactId',
				isArray: true
			}
		});

		return service;
	}
})();