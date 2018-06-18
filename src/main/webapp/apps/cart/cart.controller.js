(function() {
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['$scope', 'Principal', '$state', '$rootScope', 'CartService'];

    function CartController ($scope, Principal, $state, $rootScope, CartService) {
    	var vm = this;
        vm.getAllOrder = getAllOrder;
        vm.newDate = null;
        vm.cartWarning = false;
        vm.cartCheckBox = false;
        angular.element(document).ready(function () {
        });

        // Init controller
        (function initController() {
            getAllOrder();
            vm.newDate = new Date();
        })();

  		// Properties & function declare
  		
  		
  		// Function
        function getAllOrder() {
            CartService.getAll({}, onGetAllOrderSuccess, onGetAllOrderError);
        }
        function onGetAllOrderSuccess(result) {
            vm.allOrder = result;
            for (var i = 0; i < vm.allOrder.length; i++) {
                if( vm.allOrder[i].inceptionDate < vm.newDate){
                    vm.cartWarning = true;
                }else{
                    vm.cartCheckBox = true;
                }
            }
        }
        function onGetAllOrderError() {
            toastr.error("error!");
        }

    }
})();
