// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
    'use strict';
    angular
      .module('app')
      .controller('DashboardController', DashboardController);
    
    DashboardController.$inject = ['$scope', 'DashboardService', 'ReportService', '$controller', '$state', '$uibModal', '$ngConfirm', '$rootScope', 'Principal', '$timeout', '$localStorage'];

      function DashboardController($scope, DashboardService, ReportService, $controller, $state, $uibModal, $ngConfirm, $rootScope, Principal, $timeout, $localStorage) {
    	  var vm = this;
        
	        // Declare variable and method
    	  	vm.weekConstant = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    		vm.yearConstant = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    		
    	  	vm.isSearchCollapsed = true;
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
	        
	        vm.searchBaoViet = {
		  			  "pageable": {
		  			    "page": 0,
		  			    "size": 3
		  			  },
	    			  "contactCode": "",
	    			  "contactName": "",
	    			  "email": "",
	    			  "fromDate": "",
	    			  "gycbhNumber": "",
	    			  "statusPolicy": "",
	    			  "phone": "",
	    			  "productCode": "",
	    			  "toDate": "",
	    			  "createType": "",
	    			  "agentId": "",
		  			  "departmentId": ""
		    	};
	        
	        vm.chartIncomeOptions = chartIncomeOptions;
	        vm.chartCommissionOptions = chartCommissionOptions;
	        
	        // paging
	        vm.page = 1;
	        vm.itemsPerPage = 3;
	        
	        vm.totalItemsAgency = 0;
	        vm.totalItemsAgreement = 0;
	        
	        vm.dataIncome = {};
	        vm.dataCommission = {};
	        vm.searchReport = searchReport;
	        vm.changeDate = changeDate;
	        vm.goOrder = goOrder;
	        vm.goOrderWait = goOrderWait;
	        vm.getAllWaitAgency = getAllWaitAgency;
	        vm.getAllWaitAgreement = getAllWaitAgreement;
	        vm.confirmCommunication = confirmCommunication;
	        
	        vm.AllWaitAgency = [];
	        vm.AllWaitAgreement = [];
	        var modalInstance = null;
	        vm.arrDepartment = [];
	        vm.department = {};
	        
	        // Test data
	        angular.element(document).ready(function () {
	        	changeFilterDate("WEEK");
	        	console.log('current_department_id:' + $rootScope.current_department_id);
	        });

	    	// Init controller
	  		(function initController() {
	  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
	  			
	  			$controller('AgreementBaseController', { vm: vm, $scope: $scope });
	  			
	  			getAllWaitAgency();
	  			getAllWaitAgreement();
//	  			chooseDepartment();
	  		})();	

	  		$rootScope.$on('authenticationSuccess', function() {
	  			console.log('login success');
	  			// ngConfirm open popup chon department
	        });
	  		
	  		// Implement function 
//	  		function chooseDepartment() {
//	  			if ($localStorage.current_department_id == undefined || $localStorage.current_department_id == null) {
//	  				Principal.identity().then(function(account) {
//			  			vm.arrDepartment = account.lstDepartment;
//			  			console.log(vm.currentAccount);
//			  			if (vm.arrDepartment == null || vm.arrDepartment == undefined) {
//			  				$rootScope.current_department_id = null;
//			  			}
//			  			
//			  			$scope.selectedDepartment = vm.arrDepartment[0].departmentId;
//			  			if (vm.arrDepartment.length > 1) {
//			  				$ngConfirm({
//				                title: 'Chọn phòng ban',
//				                icon: 'fas fa-users',
//				                theme: 'modern',
//				                type: 'blue',
//				                contentUrl: 'views/theme/blocks/form-department.html',
//				                scope: $scope,
//				                animation: 'scale',
//				                closeAnimation: 'scale',
//				                buttons: {
//				                    ok: {
//				                    	text: 'Đồng ý',
//				                        btnClass: 'btn-green',
//				                        action: function (scope) {
//				                        	$localStorage.current_department_id = scope.selectedDepartment;
//				                        }
//				                    }
//				                },
//				            })
//			  			} else {
//				  			// neu 1 BU -> set rootScope
//			  				$localStorage.current_department_id = vm.arrDepartment[0].departmentId;
//			  			}
//		            });
//	  			}
//	  		}
	  		
	  		function changeFilterDate(type) {
	  			vm.filterDate = type;
	    		
	    		if (vm.filterDate != 'ENHANCE') {
	    			vm.isSearchCollapsed = true;
	    			loadData();
	    		} else {
	    			vm.isSearchCollapsed = false;
	    		}
	  		}
	  		
	  		function getAllWaitAgency() {
	    		vm.AllWaitAgency = [];
	    		DashboardService.getAllWaitAgency(vm.searchBaoViet, onSuccess, onError);
	    		
	    		function onSuccess(result, headers) {
	    			vm.totalItemsAgency = headers('X-Total-Count');
	    			vm.AllWaitAgency = result;
	            }

	            function onError(result) {
	            	
	            }
	  		}
	  		
	  		function getAllWaitAgreement() {
	    		vm.AllWaitAgreement = [];
	    		DashboardService.getAllWaitAgreement(vm.searchBaoViet, onSuccess, onError);
	    		
	    		function onSuccess(result, headers) {
	    			vm.totalItemsAgreement = headers('X-Total-Count');
	    			vm.AllWaitAgreement = result;
	            }

	            function onError(result) {
	            }
	  		}
	  		
	  		function goOrder() {
//	  			$state.go("order.me", {status: 81});
	  			$state.go("order.agency");
	  		}
	  		
	  		function goOrderWait() {
	  			$state.go("order.baoviet");
	  		}
	  		
	  		$scope.$on('saveCommunicationSuccess', function() {
	  			getAllWaitAgency();
	  			getAllWaitAgreement();
            });
	  		
	  		function confirmCommunication(order) {
	  			$ngConfirm({
	                title: 'Xác nhận',
	                icon: 'fas fa-comments',
	                theme: 'modern',
	                type: 'red',
	                content: '<div class="text-center">Bạn chắc chắn muốn trao đổi hợp đồng ' + order.gycbhNumber + ' này ?</div>',
	                animation: 'scale',
	                closeAnimation: 'scale',
	                buttons: {
	                    ok: {
	                    	text: 'Đồng ý',
	                        btnClass: "btn-blue",
	                        action: function(scope, button){
	                        	communication(order);
		                    }
	                    },
	                    close: {
	                    	text: 'Hủy'
	                    }
	                },
	            });
	  		}
	  		
	  		function communication(order) {
	  			$rootScope.communication_GycbhNumber = order.gycbhNumber;
	            modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'apps/communication/view/communication-dialog.html',
	                controller: 'CommunicationController',
	                controllerAs: 'vm',
	                size: 'lg',
	                resolve: {
	                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
	                        $translatePartialLoader.addPart('global');
	                        return $translate.refresh();
	                    }]
	                }
	            });	            
	  		}
	  		
	  		function searchReport() {
	        	console.log('search report,' + vm.searchCriterial);
	        	
	        	// validate
	        	if (vm.searchCriterial.fromDate == '' || vm.searchCriterial.toDate == '') {
	        		toastr.error('Không đủ dữ liệu để tìm kiếm!');
	        		return;
	        	}
	        	
	        	if(changeDate()){
	        		// Search
	            	loadData();	
	        	}     	
	        }
	  		
	  		function changeDate(){
	  			if (vm.searchCriterial.fromDate != "" && vm.searchCriterial.toDate != ""){
	  				if(!vm.checkDate(vm.searchCriterial.fromDate, vm.searchCriterial.toDate)){
	  					toastr.error("Thời gian tìm kiếm từ ngày - đến ngày không phù hợp");
	  					return false;
	  				}
	  				return true;
	  			}
	  		}
	  		
	  		function resetData() {
	  			vm.dataIncome = {};
		        vm.dataCommission = {};
		        
		        // Income
	  			vm.chartIncomeOptions.xAxis[0].data = vm.weekConstant;
	  			vm.chartIncomeOptions.series[0].data = [0, 0, 0, 0, 0, 0, 0];
	  			vm.chartIncomeOptions.series[1].data = [0, 0, 0, 0, 0, 0, 0];
	  			
	  			// Commission
	  			vm.chartCommissionOptions.xAxis[0].data = vm.weekConstant;
		        vm.chartCommissionOptions.series[0].data = [0, 0, 0, 0, 0, 0, 0];
		        vm.chartCommissionOptions.series[1].data = [0, 0, 0, 0, 0, 0, 0];
	  		}
	  		
	  		function loadData() {
	  			resetData();
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
	  				debugger
	  				vm.report = data;
//	  				toastr.remove();
//	  				toastr.success("Dữ liệu đã được cập nhật");
	  				loadReportIncome();
	  				loadReportCommission();
	  			}
	  			
	  			function onSearchError() {
	  				vm.isLoading = false;
//	  				toastr.remove();
//	  				toastr.error("Lỗi khi tìm kiếm data báo cáo!");
	  			}
	  		}
	  		
	  		function loadReportIncome() {
	  			ReportService.getReportIncome(vm.searchCriterial, onSearchIncomeSuccess, onSearchIncomeError);
	  			
	  			function onSearchIncomeSuccess(result) {
	  				vm.dataIncome = result;
	  				updateChartDataIncome(vm.filterDate, result.data);
	  			}
	  			
	  			function onSearchIncomeError() {
	  			}
	  		}
	  		
	  		function loadReportCommission() {
	  			ReportService.getReportCommission(vm.searchCriterial, onSearchCommissionSuccess, onSearchCommissionError);
	  			
	  			function onSearchCommissionSuccess(result) {
	  				vm.dataCommission = result;
	  				updateChartDataCommission(vm.filterDate, result);
	  			}
	  			
	  			function onSearchCommissionError() {
	  			}
	  		}
	  		
	  		function updateChartDataIncome(type, data) {
	  			// Update chart xAxis
	    		switch(type) {
		    	    case "WEEK":
		    	    	vm.chartIncomeOptions.xAxis[0].data = vm.weekConstant;
		    	        vm.chartIncomeOptions.series[0].data = getYaxisDataIncome(data);
		    	        vm.chartIncomeOptions.series[1].data = getYaxisDataIncome(data);
		    	        break;
		    	    case "MONTH":
		    	        vm.chartIncomeOptions.xAxis[0].data = getXaxisData(data);
		    	        vm.chartIncomeOptions.series[0].data = getYaxisDataIncome(data);
		    	        vm.chartIncomeOptions.series[1].data = getYaxisDataIncome(data);
		    	        break;
		    	    case "YEAR":
		    	    	vm.chartIncomeOptions.xAxis[0].data = vm.yearConstant;
		    	        vm.chartIncomeOptions.series[0].data = getYaxisDataIncome(data);
		    	        vm.chartIncomeOptions.series[1].data = getYaxisDataIncome(data);
		    	        break;
		    	    case "ENHANCE":
		    	    	vm.chartIncomeOptions.xAxis[0].data = getXaxisData(data);
		    	        vm.chartIncomeOptions.series[0].data = getYaxisDataIncome(data);
		    	        vm.chartIncomeOptions.series[1].data = getYaxisDataIncome(data);
		    	        break;
		    	    default:
		    	    	break;
		    	}
	  		}
	  		
	  		function getYaxisDataIncome(data) {
	  			var result = [];
	  			angular.forEach(data, function(item) {
	  				result.push(item.totalPremium);
	  			});
	  			
	  			return result;
	  		}
	  		
	  		// COmmission
	  		function updateChartDataCommission(type, data) {
	  			// Update chart xAxis
	    		switch(type) {
		    	    case "WEEK":
		    	    	vm.chartCommissionOptions.xAxis[0].data = vm.weekConstant;
		    	        vm.chartCommissionOptions.series[0].data = getYaxisDataCommission(data.otherData);
		    	        vm.chartCommissionOptions.series[1].data = getYaxisDataCommission(data.data);
		    	        break;
		    	    case "MONTH":
		    	        vm.chartCommissionOptions.xAxis[0].data = getXaxisData(data.data);
		    	        vm.chartCommissionOptions.series[0].data = getYaxisDataCommission(data.otherData);
		    	        vm.chartCommissionOptions.series[1].data = getYaxisDataCommission(data.data);
		    	        break;
		    	    case "YEAR":
		    	    	vm.chartCommissionOptions.xAxis[0].data = vm.yearConstant;
		    	        vm.chartCommissionOptions.series[0].data = getYaxisDataCommission(data.otherData);
		    	        vm.chartCommissionOptions.series[1].data = getYaxisDataCommission(data.data);
		    	        break;
		    	    case "ENHANCE":
		    	    	vm.chartCommissionOptions.xAxis[0].data = getXaxisData(data);
		    	        vm.chartCommissionOptions.series[0].data = getYaxisDataCommission(data.otherData);
		    	        vm.chartCommissionOptions.series[1].data = getYaxisDataCommission(data.data);
		    	        break;
		    	    default:
		    	    	break;
		    	}
	  		}
	  		
	  		function getXaxisData(data) {
	  			var result = [];
	  			angular.forEach(data, function(item) {
	  				result.push(item.datePayment);
	  			});
	  			
	  			return result;
	  		}
	  		
	  		function getYaxisDataCommission(data) {
	  			var result = [];
	  			angular.forEach(data, function(item) {
	  				result.push(item.tongHoaHong);
	  			});
	  			
	  			return result;
	  		}
      }
      
})();
