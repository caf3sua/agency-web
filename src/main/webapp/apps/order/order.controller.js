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
  		
  		function cancelOrder() {
  			$ngConfirm({
  	            title: 'Confirm!',
  	            content: '<strong>{{name}}</strong> is my favourite song',
  	            scope: $scope,
  	            buttons: {
  	                sayBoo: {
  	                    text: 'Say Booo',
  	                    btnClass: 'btn-blue',
  	                    action: function(scope, button){
  	                        scope.name = 'Booo!!';
  	                        return false; // prevent close;
  	                    }
  	                },
  	                somethingElse: {
  	                    text: 'Something else',
  	                    btnClass: 'btn-orange',
  	                    action: function(scope, button){
  	                        $ngConfirm('You clicked on something else');
  	                    }
  	                },
  	                close: function(scope, button){
  	                    // closes the modal
  	                },
  	            }
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
