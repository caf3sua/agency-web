(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'Principal', '$state', '$rootScope', 'OrderService', '$ngConfirm'];

    function OrderController ($scope, Principal, $state, $rootScope, OrderService, $ngConfirm) {
    	var vm = this;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  		})();
  		
  		// Properties & function declare
  		vm.orders = [];
  		vm.searchCriterial = {
  			  "contactCode": "",
  			  "contactName": "",
  			  "email": "",
  			  "fromDate": "",
  			  "gycbhNumber": "",
  			  "lstStatusPolicy": [
  			    "90", "91"
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
                icon: 'fa fa-check',
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
  			vm.orders = [];
  			
  			OrderService.search(vm.searchCriterial, onSearchSuccess, onSearchError);
  			
  			function onSearchSuccess(result) {
  				vm.orders = result;
  				$timeout(function ()
						{$(window).trigger('resize');}, 4000);
  				
  	        }
  	        function onSearchError() {
  	            toastr.error("error!");
  	        }
  		}
    }
})();
