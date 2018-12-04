(function() {
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['$scope', '$stateParams', '$location', '$window', 'Principal', '$state', '$rootScope', 'CartService', 'DateUtils', 'PAGINATION_CONSTANTS', '$controller', '$ngConfirm', 'OrderService'];

    function CartController ($scope, $stateParams, $location, $window, Principal, $state, $rootScope, CartService, DateUtils, PAGINATION_CONSTANTS, $controller, $ngConfirm, OrderService) {
    	var vm = this;
        
        // paging
        vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = PAGINATION_CONSTANTS.itemsPerPage;
        vm.transition = transition;
        vm.loadPage = loadPage;

  		// Properties & function declare
        vm.allOrderInit = [];
        vm.allOrder = [];
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
    			  "statusPolicy": "",
    			  "phone": "",
    			  "productCode": "",
    			  "toDate": "",
    			  "createType": "",
    			  "departmentId": "",
    			  "createDate": ""
    		};
        
  		vm.processPayment = processPayment;
//  		vm.getAllOrder = getAllOrder;
        vm.newDate = null;
        vm.cartWarning = false;
        vm.cartCheckBox = false;
        vm.inceptionDateFormat = null;
        vm.expiredDate = null;
        vm.dateUtil = dateUtil;
        vm.sumMoney = 0;
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
        vm.couponCode = null;
        vm.bankCode = null;
        vm.agreementIds = [];
        vm.checkTypePay = 'agency';
  		
        vm.confirmCancelCart = confirmCancelCart;
        vm.changeDate = changeDate;
        vm.searchCart = searchCart;
        vm.showPayment;
        vm.nextStep = nextStep;
        
        vm.selectedDepartmentId;
        
        vm.flagInit = true;
        vm.selectedGycbhNumber;
        
    	angular.element(document).ready(function () {
        });

        // Init controller
        (function initController() {
        	$controller('AgreementBaseController', { vm: vm, $scope: $scope });
//            getAllOrder();
        	searchCart();
            vm.newDate = new Date();
            
            var paymentResult = $location.search().paymentStatus;
            if(paymentResult) {
            	if(paymentResult == '3') {
            		toastr.success("Thanh toán thành công!");
            	} else {
            		toastr.error("Thanh toán thất bại!");
            	}
            }
        })();
        
        $scope.$watch('vm.checkTypePay', function () {
  			if (vm.checkTypePay == 'agency') {
  				vm.typeBank = 'ViettelPay';
  			} else {
  				vm.typeBank = 'Momo';
  			}
  		});
        
  		// Function
//        function getAllOrder() {
//            CartService.getAll({
//            	page: $stateParams.page - 1,
//                size: vm.itemsPerPage
////                sort: sort()
//            }, onGetAllOrderSuccess, onGetAllOrderError);
//        }
        
        function transition () {
//            $state.transitionTo($state.$current, {
//                page: vm.page,
//                search: vm.currentSearch
//            });
        	vm.isLoading = true;
        	vm.searchCriterial.pageable.page = vm.page - 1;
        	searchCart();
        }
        
        function nextStep() {
        	vm.showPayment = true;
        }
        
        function changeDate(){
  			if (vm.searchCriterial.fromDate != "" && vm.searchCriterial.toDate != ""){
  				if(!vm.checkDate(vm.searchCriterial.fromDate, vm.searchCriterial.toDate)){
  					toastr.error("Thời gian từ ngày - đến ngày không phù hợp");
  					return false;
  				}
  			}
  			return true;
  		}
        
        function searchCart() {
        	resetCartValue();
        	
  			if (changeDate()) {
  				if (vm.selectedDepartmentId != null && vm.selectedDepartmentId != undefined){
  					vm.searchCriterial.departmentId = vm.selectedDepartmentId;	
  				} else {
  					vm.searchCriterial.departmentId = "";
  				}
  				
  				CartService.searchCart(vm.searchCriterial, onGetAllOrderSuccess, onGetAllOrderError);
  			}
  		}
        
        function onGetAllOrderSuccess(result, headers) {
//        	vm.links = ParseLinks.parse(headers('link'));
            vm.totalItems = headers('X-Total-Count');
            vm.queryCount = vm.totalItems;
//            vm.page = $stateParams.page;
            vm.isLoading = false;
        	
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
                        vm.type91 = true;
                        break;
                    default:
                        break;
                }
            }
            
            // Init selected
            if (vm.flagInit) {
            	vm.flagInit = false;
            	let gycbhNumber = $stateParams.sel;
            	if (gycbhNumber != null && gycbhNumber != undefined) {
            		angular.forEach(vm.allOrder, function(item, key) {
            			if (item.policyNumber == gycbhNumber) {
            				item.check = true;
            				selectCheckBoxCart(item);
            			}
    			 	});
            	}
            }
        }
        
        function onGetAllOrderError() {
        	vm.isLoading = false;
            toastr.error("Lỗi khi lấy đơn hàng");
        }
        
        function dateUtil(date) {
            return DateUtils.convertLocalDateToServer(date);
        }
        
        function resetCartValue() {
        	vm.sumMoney = 0;
            vm.agreementIds = [];
        }
        
        function selectCheckBoxCart(data) {
            if(data.check == true){
                var money = data.totalPremium;
                vm.sumMoney = vm.sumMoney + money;
                vm.agreementIds.push(data.agreementId);
            }else {
                var money = data.totalPremium;
                vm.sumMoney = vm.sumMoney - money;
                var index = vm.agreementIds.indexOf(data.agreementId);
                if (index !== -1) {
            		vm.agreementIds.splice(index, 1);
                }
            }

        }
        
        function getListBank() {
            CartService.getBanksByPaymentCode({paymentCode:vm.typeBank}, onGetListBankSuccess, onGetListBankError)
        }
        
        function onGetListBankSuccess(result) {
            vm.getListBankObj = result.paymentBanks;
        }
        
        function onGetListBankError() {
            toastr.error("Lỗi khi lấy danh sách ngân hàng");
        }

        function processPayment() {
        	if(vm.agreementIds.length == 0) {
        		toastr.error("Bạn cần chọn đơn hàng!");
        		return;
        	}
        	
        	var paymentData = {
    			"agreementIds" : vm.agreementIds,
    			"bankCode": vm.bankCode,
    			"couponCode": vm.couponCode,
    			"paymentFee": vm.sumMoney,
    			"paymentType": vm.typeBank
        	}
        	
        	if(!vm.typeBank) {
        		toastr.error("Bạn cần chọn phương thức thanh toán");
        		return;
        	} else if(vm.typeBank == '123pay' || vm.typeBank == 'VnPay') {
        		if(!vm.bankCode) {
        			toastr.error("Bạn cần chọn ngân hàng hỗ trợ!");
            		return;
        		}
        	} else if (vm.typeBank == 'PAYMENT_LATER') {
        		CartService.paymentLater(paymentData, onProcessPaymentLaterSuccess, onProcessPaymentError)
        		return;
        	}
    		
        	CartService.processPayment(paymentData, onProcessPaymentSuccess, onProcessPaymentError)
        }
        
        function onProcessPaymentLaterSuccess(result) {
        	$rootScope.$broadcast('agreementChangeSuccess');
        	$state.go('order.later');
        }
        
        function onProcessPaymentSuccess(result) {
        	$window.location.href = result.redirectUrl;
        	$rootScope.$broadcast('agreementChangeSuccess');
        }
        
        function onProcessPaymentError(result) {
        	debugger
        	let message = result.message || "Có lỗi xảy ra khi thanh toán!";
        	toastr.error(message);
        }
        
        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function confirmCancelCart(gycbhNumber) {
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
                        	cancelOrder(gycbhNumber);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
		
		function cancelOrder(number) {
  			console.log('doCancelOrder');
  			OrderService.cancelOrder({gycbhNumber: number}, onSuccess, onError);
  			
  			function onSuccess(result) {
//  				getAllOrder();
  				toastr.success('Đã hủy đơn hàng với mã: ' + result.gycbhNumber);
  				$rootScope.$broadcast('agreementChangeSuccess');
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi hủy đơn hàng!");
  			}
  		}
    }
})();
