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
			},
			'getAllWaitAgency' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order-agency',
                isArray : true
            },
			'getAllWaitAgreement' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order-wait',
                isArray : true
            }
		});

    	return service;
    }
})();
