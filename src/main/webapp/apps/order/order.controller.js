(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'Principal', '$state', '$rootScope', 'OrderService', '$ngConfirm'];

    function OrderController ($scope, Principal, $state, $rootScope, OrderService, $ngConfirm) {
    	var vm = this;
        vm.getAllOrder = getAllOrder;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
            getAllOrder;
  		})();
  		
  		// Properties & function declare
  		vm.viewDetail = viewDetail;
  		vm.cancelOrder = cancelOrder;
  		
  		// Function
  		function viewDetail() {
  			
  		}
  		
  		function doCancelOrder() {
  			console.log('doCancelOrder');
  		}
  		
  		function cancelOrder() {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-check',
                theme: 'modern',
                type: 'red',
//                scope: vm,
                content: '<div class="text-center">Bạn chắc chắn muốn hủy hợp đồng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	doCancelOrder();
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
  		
  		
        function getAllOrder() {
            OrderService.getAllOrder("", onGetAllOrderSuccess, onGetAllOrderError);
        }
        function onGetAllOrderSuccess(result) {
            vm.allOrder = result;
        }
        function onGetAllOrderError() {
            toastr.error("error!");
        }
    }
})();
