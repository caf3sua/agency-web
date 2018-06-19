(function() {
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['$scope', 'Principal', '$state', '$rootScope', 'CartService', 'DateUtils'];

    function CartController ($scope, Principal, $state, $rootScope, CartService, DateUtils) {
    	var vm = this;
        vm.getAllOrder = getAllOrder;
        vm.newDate = null;
        vm.cartWarning = false;
        vm.cartCheckBox = false;
        vm.inceptionDateFormat = null;
        vm.expiredDate = null;
        vm.dateUtil = dateUtil;
        vm.sumMoney = null;
        vm.selectCheckBoxCart = selectCheckBoxCart;
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
                vm.inceptionDateFormat = new Date(vm.allOrder[i].inceptionDate);
                vm.expiredDate = new Date(vm.allOrder[i].expiredDate);
            }
        }
        function onGetAllOrderError() {
            toastr.error("error!");
        }
        function dateUtil(date) {
            return DateUtils.convertLocalDateToServer(date);
        }
        function selectCheckBoxCart(data) {
            var money = data.totalPremium;
            vm.sumMoney = vm.sumMoney + money
        }
    }
})();
