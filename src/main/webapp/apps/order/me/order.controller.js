(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', '$stateParams', '$controller', '$state', '$rootScope', 'OrderService', '$ngConfirm', '$timeout', 'PAGINATION_CONSTANTS', '$uibModal'];

    function OrderController ($scope, $stateParams, $controller, $state, $rootScope, OrderService, $ngConfirm, $timeout, PAGINATION_CONSTANTS, $uibModal) {
    	var vm = this;
        
    	// Properties & function declare
        // paging
    	vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = PAGINATION_CONSTANTS.itemsPerPage;
        vm.transition = transition;
        
  		vm.isLoading = false;
  		vm.orders = [];
  		vm.searchCriterial = {
			  "pageable": {
			    "page": 0,
			    "size": vm.itemsPerPage
			  },
  			  "contactCode": "",
  			  "contactName": "",
  			  "email": "",
  			  "fromDate": "",
  			  "gycbhNumber": "",
  			  "lstStatusPolicy": [
  			    ""
  			  ],
  			  "phone": "",
  			  "productCode": "",
  			  "toDate": "",
  			  "createType": "",
  			  "departmentId": "",
  			  "createDate": ""
  		};
  		vm.sotiennophi;
  		
  		vm.searchOrder = searchOrder;
  		vm.confirmResendEmail = confirmResendEmail;
  		vm.confirmViewAgreement = confirmViewAgreement;
  		vm.changeDate = changeDate;
  		vm.selectedDepartmentId;
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
  			
  		    $controller('AgreementBaseController', { vm: vm, $scope: $scope });

  		    searchOrder();
  		})();
  		
  		function changeDate(){
  			if (vm.searchCriterial.fromDate != "" && vm.searchCriterial.toDate != ""){
  				if(!vm.checkDate(vm.searchCriterial.fromDate, vm.searchCriterial.toDate)){
  					toastr.error("Thời gian từ ngày - đến ngày không phù hợp");
  					return false;
  				}
  			}
  			return true;
  		}
  		
  		function searchOrder() {
  			if (changeDate()) {
  				vm.totalItems = null;
  	  			vm.isLoading = true;
  	  			vm.orders = [];
  	  			var order = {};

	  	  		if (vm.selectedDepartmentId != null && vm.selectedDepartmentId != undefined){
					vm.searchCriterial.departmentId = vm.selectedDepartmentId;	
				} else {
					vm.searchCriterial.departmentId = "";
				}
  	  			
  	  			OrderService.search(vm.searchCriterial, onSearchSuccess, onSearchError);
  	  			function onSearchSuccess(result, headers) {
  	  				// Paging
  	  				vm.orders = result;
  	  				vm.isLoading = false;
  	                
  	  				vm.totalItems = headers('X-Total-Count');
  	                vm.queryCount = vm.totalItems;
  	                
  	  				toastr.success('Tìm thấy ' + vm.orders.length + ' đơn hàng phù hợp');
  	  	        }
  	  	        function onSearchError() {
  	  	        	vm.isLoading = false;
  	  	            toastr.error("Lỗi khi tìm kiếm đơn hàng!");
  	  	        }
  			}
  		}
  		
  		function search(page) {
  			console.log('transition, page:' + vm.page);
  			vm.isLoading = true;

  			if (vm.selectedDepartmentId != null && vm.selectedDepartmentId != undefined){
				vm.searchCriterial.departmentId = vm.selectedDepartmentId;	
			} else {
				vm.searchCriterial.departmentId = "";
			}
  			
  			var order = {};
  			order = vm.searchCriterial;
  			order.pageable.page = vm.page - 1;
        	console.log('searchAllTransition, page: ' + order.pageable.page);
        	
  			OrderService.search(order, onSearchSuccess, onSearchError);
  			function onSearchSuccess(result, headers) {
  				// Paging
  				vm.orders = result;
  				vm.isLoading = false;
  				toastr.success('Tìm thấy ' + vm.orders.length + ' đơn hàng phù hợp');
  	        }
  	        function onSearchError() {
  	        	vm.isLoading = false;
  	            toastr.error("Lỗi khi tìm kiếm đơn hàng!");
  	        }
  		}
  		
        function transition () {
        	// search
        	search();
        }
        
        function confirmResendEmail(gycbhNumber) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-envelope',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn gửi lại email ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	resendEmail(gycbhNumber);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
        
  		function resendEmail(number) {
  			console.log('doResendEmail');
  			OrderService.resendEmail({gycbhNumber: number}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				toastr.success('Đã gửi lại email với mã đơn hàng: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi gửi lại email đơn hàng!");
  			}
  		}
  		
  		function confirmViewAgreement(order) {
  			if (order.createType == "0"){
  				$state.go("order.order-detail", {id: order.agreementId});
  			} else if (order.createType == "2") {
  				$state.go("product.printed-paper-detail", {id: order.gycbhNumber});
  			} else {
  				$state.go("product.ycbh-offline-detail", {id: order.gycbhNumber});
  			}
  		}
  		
    }
})();
