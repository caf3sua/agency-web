(function() {
    'use strict';

    angular
        .module('app')
        .factory('DashboardService', DashboardService);

    DashboardService.$inject = ['$resource'];

    function DashboardService ($resource) {
    	var service = $resource('', {}, {
			'getReportDashboard' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-dashboard'
			}
		});

    	return service;
    }
})();
