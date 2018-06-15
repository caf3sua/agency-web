(function() {
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['$scope', 'Principal', '$state', '$rootScope', 'CartService'];

    function CartController ($scope, Principal, $state, $rootScope, CartService) {
    	var vm = this;
        vm.getAllOrder = getAllOrder;
        angular.element(document).ready(function () {
        });

        // Init controller
        (function initController() {
            getAllOrder();
        })();

  		// Properties & function declare
  		
  		
  		// Function
        function getAllOrder() {
            CartService.getAll({}, onGetAllOrderSuccess, onGetAllOrderError);
        }
        function onGetAllOrderSuccess(result) {
            vm.allOrder = result;
        }
        function onGetAllOrderError() {
            toastr.error("error!");
        }

    }
})();
