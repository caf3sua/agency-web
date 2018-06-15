(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'Principal', '$state', '$rootScope', 'OrderService'];

    function OrderController ($scope, Principal, $state, $rootScope, OrderService) {
    	var vm = this;
        vm.getAllOrder = getAllOrder;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
            getAllOrder;
  		})();
  		
  		// Properties & function declare
  		
  		
  		// Function
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
