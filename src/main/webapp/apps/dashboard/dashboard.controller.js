// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
    'use strict';
    angular
      .module('app')
      .controller('DashboardController', DashboardController);
    
    DashboardController.$inject = ['$scope', 'DashboardService'];

      function DashboardController($scope, DashboardService) {
    	  var vm = this;
        
	        // Declare variable and method
	        vm.filterDate = '';
	        vm.changeFilterDate = changeFilterDate;
	        vm.isLoading = false;
	        vm.searchCriterial = {
	        		  "fromDate": "",
	        		  "periodTime": "",
	        		  "toDate": ""
    		};
	        vm.report = {
	        		  "totalOrder" : "",
	        		  "numberOrderPaid" : "",
	        		  "numberOrderNotPaid" : "",
	        		  "totalPremmium" : "",
	        		  "premiumPaid" : "",
	        		  "premiumNotPaid" : "",
	        		  "waitAgency" : [],
	        		  "waitBaoviet" : []
    		};
	        
	        // Test data
	        vm.p_l_1 = [[1, 6.1], [2, 6.3], [3, 6.4], [4, 6.6], [5, 7.0], [6, 7.7], [7, 8.3]];
	        vm.p_l_2 = [[1, 5.5], [2, 5.7], [3, 6.4], [4, 7.0], [5, 7.2], [6, 7.3], [7, 7.5]];
	        vm.p_l_3 = [[1, 2], [2, 1.6], [3, 2.4], [4, 2.1], [5, 1.7], [6, 1.5], [7, 1.7]];
	        vm.p_l_4 = [[1, 3], [2, 2.6], [3, 3.2], [4, 3], [5, 3.5], [6, 3], [7, 3.5]];
	        vm.p_l_5 = [[1, 3.6], [2, 3.5], [3, 6], [4, 4], [5, 4.3], [6, 3.5], [7, 3.6]];
	        vm.p_l_6 = [[1, 10], [2, 8], [3, 27], [4, 25], [5, 50], [6, 30], [7, 25]];
	
	        vm.p_b_1 = [[1, 2], [2, 4], [3, 5], [4, 7], [5, 6], [6, 4], [7, 5], [8, 4]];
	        vm.p_b_2 = [[3, 1], [2, 2], [6, 3], [5, 4], [7, 5]];
	        vm.p_b_3 = [[1, 3], [2, 4], [3, 3], [4, 6], [5, 5], [6, 4], [7, 5], [8, 3]];
	        vm.p_b_4 = [[1, 2], [2, 3], [3, 2], [4, 5], [5, 4], [6, 3], [7, 4], [8, 2]];

	        angular.element(document).ready(function () {
	        	changeFilterDate("WEEK");
	        });

	    	// Init controller
	  		(function initController() {
	  		})();

	  		// Implement function 
	  		function changeFilterDate(type) {
	  			vm.filterDate = type;
	  			
	  			// Load report
	  			loadReport();
	  		}
          
	  		function loadReport() {
	  			vm.isLoading = true;
	  			vm.report = {
		        		  "totalOrder" : "",
		        		  "numberOrderPaid" : "",
		        		  "numberOrderNotPaid" : "",
		        		  "totalPremmium" : "",
		        		  "premiumPaid" : "",
		        		  "premiumNotPaid" : "",
		        		  "waitAgency" : [],
		        		  "waitBaoviet" : []
	    		};
	  			
	  			if (vm.filterDate != 'ENHANCE') {
	  				vm.searchCriterial = {
	  	        		  "fromDate": "",
	  	        		  "periodTime": vm.filterDate,
	  	        		  "toDate": ""
	  				};
	      		} else {
	      			vm.searchCriterial.periodTime = "";
	      		}
	  			
	  			DashboardService.getReportDashboard(vm.searchCriterial, onSearchSuccess, onSearchError);
	  			
	  			function onSearchSuccess(data) {
	  				vm.isLoading = false;
	  				vm.report = data;
	  				toastr.remove();
	  				toastr.success("Dữ liệu đã được cập nhật");
	  			}
	  			
	  			function onSearchError() {
	  				vm.isLoading = false;
	  				toastr.remove();
	  				toastr.error("Lỗi khi tìm kiếm data báo cáo!");
	  			}
	  		}
      }
      
})();
