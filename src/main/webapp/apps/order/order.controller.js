(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', '$stateParams', 'Principal', '$state', '$rootScope', 'OrderService', '$ngConfirm', '$timeout', 'PAGINATION_CONSTANTS'];

    function OrderController ($scope, $stateParams, Principal, $state, $rootScope, OrderService, $ngConfirm, $timeout, PAGINATION_CONSTANTS) {
    	var vm = this;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  		})();
  		
  		// Properties & function declare
        // paging
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
  		
  		
  		vm.viewDetail = viewDetail;
  		vm.confirmCancelOrder = confirmCancelOrder;
  		vm.searchOrder = searchOrder;
  		vm.confirmResendEmail = confirmResendEmail;
  		
  		// Function
  		
//  		$scope.$watch('vm.page', function() {
//  	        console.log('page change:' + vm.page);
//  	    });
  		
  		
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
        	if ($rootScope.deviceFilter != null) {
        		order = $rootScope.orderFilter;
        	} else {
        		order = vm.searchCriterial;
            	
            	// keep filter
            	storeFilterCondition(order);
        	}
  			
  			OrderService.search(vm.searchCriterial, onSearchSuccess, onSearchError);
  			function onSearchSuccess(result, headers) {
                vm.page = order.pageable.page + 1;
                
  				// Paging
  				vm.orders = result;
  				vm.isLoading = false;
                
  				vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                
  				$timeout(function () {
					$('#footable').trigger('footable_initialized');
					$('#footable').trigger('footable_resize');
					$('#footable').data('footable').redraw();
				}, 1000);
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
  				$timeout(function () {
					$('#footable').trigger('footable_initialized');
					$('#footable').trigger('footable_resize');
					$('#footable').data('footable').redraw();
				}, 1000);
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
        
        function storeFilterCondition(order) {
        	$rootScope.orderFilter = order;
        }
        
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
