(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', '$stateParams', 'Principal', '$state', '$rootScope', 'OrderService', '$ngConfirm', '$timeout', 'PAGINATION_CONSTANTS'];

    function OrderController ($scope, $stateParams, Principal, $state, $rootScope, OrderService, $ngConfirm, $timeout, PAGINATION_CONSTANTS) {
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
  			  "toDate": ""
  		};
  		vm.sotiennophi;
  		
  		vm.viewDetail = viewDetail;
  		vm.confirmCancelOrder = confirmCancelOrder;
  		vm.searchOrder = searchOrder;
  		vm.confirmResendEmail = confirmResendEmail;
  		vm.confirmKhachhangnophi = confirmKhachhangnophi;
  		vm.confirmTaituc = confirmTaituc;
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  		})();
  		
  		// Function
  		function viewDetail() {
  			
  		}
  		
  		function cancelOrder(number) {
  			console.log('doCancelOrder');
  			OrderService.cancelOrder({gycbhNumber: number}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				searchOrder();
  				toastr.success('Đã hủy đơn hàng với mã: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi hủy đơn hàng!");
  			}
  		}
  		
  		function confirmCancelOrder(gycbhNumber) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-times',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn hủy hợp đồng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	cancelOrder(gycbhNumber);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
  		
  		function searchOrder() {
  			vm.totalItems = null;
  			vm.isLoading = true;
  			vm.orders = [];
  			var order = {};

  			// Keep filter from root scope
//        	if ($rootScope.deviceFilter != null) {
//        		order = $rootScope.orderFilter;
//        	} else {
//        		order = vm.searchCriterial;
//            	
//            	// keep filter
//            	storeFilterCondition(order);
//        	}
  			
  			OrderService.search(vm.searchCriterial, onSearchSuccess, onSearchError);
  			function onSearchSuccess(result, headers) {
                vm.page = vm.page - 1;
                
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
  		
  		function search(page) {
  			console.log('transition, page:' + vm.page);
  			vm.isLoading = true;

  			var order = {};
  			order = vm.searchCriterial;
  			order.pageable.page = vm.page;
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
        
//        function storeFilterCondition(order) {
//        	$rootScope.orderFilter = order;
//        }
        
        function confirmResendEmail(gycbhNumber) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-times',
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
        
        function taitucPolicy(agreementId) {
  			console.log('taitucPolicy, agreementId:' + agreementId);
  			OrderService.createTaituc({agreementId: agreementId}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				toastr.success('Tái tục đơn hàng thành công');
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi tái tục đơn hàng");
  			}
        }
        
        function confirmTaituc(agreementId) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-times',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn tái tục hợp đồng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	taitucPolicy(agreementId);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
        
        function doKhachhangnophi(gycbhNumber, sotiennophi) {
        	vm.sotiennophi = sotiennophi;
        	console.log('Khách hàng nợ phí,' + vm.sotiennophi);
        	
        	toastr.success("Bổ xung khách hàng nợ phí cho hợp đồng <strong>" + gycbhNumber + "</strong> thành công");
        }
        
        function confirmKhachhangnophi(gycbhNumber) {
        	$ngConfirm({
                title: 'Khách hàng nợ phí',
                columnClass: 'col-md-6 col-md-offset-3',
                contentUrl: 'views/theme/blocks/form-khachhangnophi.html',
                buttons: {
                    ok: {
                        text: 'Đồng ý',
                        disabled: true,
                        btnClass: 'btn-green',
                        action: function (scope) {
                        	doKhachhangnophi(gycbhNumber, scope.sotiennophi);
                        }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
                onScopeReady: function (scope) {
                    var self = this;
                    scope.textChange = function () {
                        if (scope.sotiennophi)
                            self.buttons.ok.setDisabled(false);
                        else
                            self.buttons.ok.setDisabled(true);
                    }
                }
            })
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
    }
})();
