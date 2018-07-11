(function() {
	'use strict';

	angular
		.module('app')
		.factory('ReportService', ReportService);

	ReportService.$inject = [ '$resource' ];

	function ReportService($resource) {
		var service = $resource('', {}, {
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
			}
		});

		return service;
	}
})();