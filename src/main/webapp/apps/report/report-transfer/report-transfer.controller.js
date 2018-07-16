(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReportTransferController', ReportTransferController);

    ReportTransferController.$inject = ['$scope', '$controller', 'Principal', '$state'
    	, '$rootScope', 'ReportService'];

    function ReportTransferController ($scope, $controller, Principal, $state
    		, $rootScope, ReportService) {
    	var vm = this;

    	vm.transfers = [];
    	vm.transfersInit = [];
    	
    	vm.isSearchCollapsed = true;
        vm.filterDate = '';
        vm.changeFilterDate = changeFilterDate;
        vm.searchReport = searchReport;
        vm.searchCriterial = {
        		  "fromDate": "",
        		  "periodTime": "",
        		  "toDate": ""
  		};
        
    	// Properties & function declare
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			changeFilterDate('WEEK');
  		})();
  		
  		// Function
  		
  		function changeFilterDate(type) {
    		vm.filterDate = type;
    		
    		if (vm.filterDate != 'ENHANCE') {
    			vm.isSearchCollapsed = true;
    			loadData();
    		} else {
    			vm.isSearchCollapsed = false;
    		}
        }

  		function resetData() {
  			
  		}
  		
  		function loadData() {
  			resetData();
  			
  			vm.isLoading = true;
  			
  			if (vm.filterDate != 'ENHANCE') {
  				vm.searchCriterial = {
  	        		  "fromDate": "",
  	        		  "periodTime": vm.filterDate,
  	        		  "toDate": ""
  				};
      		} else {
      			vm.searchCriterial.periodTime = "";
      		}
  			
//  			ReportService.getReportTransfer({}, onSuccess, onError);
//            function onSuccess(data, headers) {
//            	vm.transfers = data;
//            	toastr.success("Cập nhật dữ liệu thành công");
//            }
//            function onError(error) {
//            	toastr.success("Lỗi khi lấy giao dịch chuyển tiền");
//            }
  		}

  		function searchReport() {
  			console.log('search report,' + vm.searchCriterial);
        	
        	// validate
        	if (vm.searchCriterial.fromDate == '' || vm.searchCriterial.toDate == '') {
        		toastr.error('Không đủ dữ liệu để tìm kiếm!');
        		return;
        	}
        	
        	// Search
        	loadData(); 
  		}
    }
})();
