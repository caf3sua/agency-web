(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'Principal', '$state', '$rootScope', 'OrderService', '$ngConfirm', '$timeout'];

    function OrderController ($scope, Principal, $state, $rootScope, OrderService, $ngConfirm, $timeout) {
    	var vm = this;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  		})();
  		
  		// Properties & function declare
  		vm.isLoading = false;
  		vm.orders = [];
  		vm.searchCriterial = {
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
  		
  		function searchOrder() {
  			vm.isLoading = true;
  			vm.orders = [];
  			
  			OrderService.search(vm.searchCriterial, onSearchSuccess, onSearchError);
  			
  			function onSearchSuccess(result) {
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
    }
})();
