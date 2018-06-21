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
        vm.getListBank = getListBank;
        vm.getListBankObj = [];
        vm.typeBank = null;
        vm.selectCheckBoxCart = selectCheckBoxCart;
        vm.type89 = false;
        vm.type90= false;
        vm.type91 = false;
        vm.type92 = false;
        vm.type93 = false;
        vm.type94 = false;
        vm.type95 = false;
        vm.type96 = false;
        vm.type97 = false;
        vm.type98 = false;
        vm.type99 = false;
        vm.type100 = false;
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
            for (var i = 0; i <  vm.allOrder.length; i++) {
                switch(vm.allOrder[i].statusPolicyId) {
                    case "89":
                        vm.type89 = true;
                        break;
                    case "90":
                        vm.type90 = true;
                        break;
                    case "91":
                        vm.type91 = true;
                        break;
                    case "92":
                        // vm.type92 = true;
                        vm.type91 = true;
                        break;
                    case "93":
                        // vm.type93 = true;
                        vm.type91 = true;
                        break;
                    case "94":
                        // vm.type94 = true;
                        vm.type91 = true;
                        break;
                    case "95":
                        // vm.type95 = true;
                        vm.type91 = true;
                        break;
                    case "96":
                        // vm.type96 = true;
                        vm.type91 = true;
                        break;
                    case "97":
                        // vm.type97 = true;
                        vm.type91 = true;
                        break;
                    case "98":
                        // vm.type98 = true;
                        vm.type91 = true;
                        break;
                    case "99":
                        // vm.type99 = true;
                        vm.type91 = true;
                        break;
                    case "100":
                        // vm.type100 = true;
                        vm.type91 = true;
                        break;
                    default:
                        break;
                }
            }
        }
        function onGetAllOrderError() {
            toastr.error("error!");
        }
        function dateUtil(date) {
            return DateUtils.convertLocalDateToServer(date);
        }
        function selectCheckBoxCart(data) {
            if(data.check == true){
                var money = data.totalPremium;
                vm.sumMoney = vm.sumMoney + money;
            }else {
                var money = data.totalPremium;
                vm.sumMoney = vm.sumMoney - money;
            }

        }
        function getListBank() {
            CartService.getBanksByPaymentCode({paymentCode:vm.typeBank}, onGetListBankSuccess, onGetListBankError)
        }
        function onGetListBankSuccess(result) {
            vm.getListBankObj = result.paymentBanks;
        }
        function onGetListBankError() {
            toastr.error("error!");
        }

    }
})();
