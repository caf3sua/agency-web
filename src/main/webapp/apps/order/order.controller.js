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
        vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = PAGINATION_CONSTANTS.itemsPerPage;
        vm.transition = transition;
        vm.loadPage = loadPage;
        
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
  		
  		// Function
  		function viewDetail() {
  			
  		}
  		
  		function cancelOrder() {
  			console.log('doCancelOrder');
  		}
  		
  		function confirmCancelOrder() {
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
                        	cancelOrder();
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
  		
  		function searchOrder(data) {
  			vm.queryCount = null;
  			vm.page = $stateParams.page - 1;
  			search(vm.searchCriterial);
  		}
  		
  		function search(data) {
  			vm.totalItems = null;
  			vm.isLoading = true;
  			vm.orders = [];

        	// keep filter
        	storeFilterCondition(data);
  			
  			OrderService.search(data, onSearchSuccess, onSearchError);
  			function onSearchSuccess(result, headers) {
  				// Paging
  				vm.orders = result;
  				vm.isLoading = false;
  				vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.page = $stateParams.page;
                
//  				$timeout(function () {
//					$('#footable').trigger('footable_initialized');
//					$('#footable').trigger('footable_resize');
//					$('#footable').data('footable').redraw();
//				}, 1000);
  				toastr.success('Tìm thấy ' + vm.orders.length + ' đơn hàng phù hợp');
  	        }
  	        function onSearchError() {
  	        	vm.isLoading = false;
  	            toastr.error("Lỗi khi tìm kiếm đơn hàng!");
  	        }
  		}
  		
  		function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function transition () {
        	debugger
        	var order = {};
        	order = $rootScope.orderFilter;
        	order.page = $stateParams.page - 1;
        	
        	// search
        	search(order);
        }
        
        function storeFilterCondition(order) {
        	$rootScope.orderFilter = order;
        }
    }
})();
